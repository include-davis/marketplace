import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import type { Application } from 'express';
import { startMongoClient } from './services/mongoService';
import { createMessagesRouter } from './routes/messagesRouter';
import listingsRouter from './routes/listingsRouter';
import conversationsRouter from './routes/conversationsRoutes';
import usersRouter from './routes/usersRouter';
import authRouter from './auth/authRoutes';
import { requireAuth } from './auth/middleware';
import { loadEnvFile } from 'process';
import { initializeSocket, setupSocketHandlers } from './socket';
import { MessagesService } from './services/messagesService';

dotenv.config();
console.log('JWT_SECRET loaded:', !!process.env.JWT_SECRET);

try {
  loadEnvFile('.env');
} catch {
  console.warn(
    'No .env file found, continuing with process environment variables',
  );
}

const app: Application = express();
app.use(cors());
app.use(express.json());

// Create HTTP server + Socket.IO — must happen before listen()
const server = initializeSocket(app);

async function setupClient() {
  const mongoUri = process.env.MONGO_CONNECTION_STRING || '';

  await mongoose.connect(mongoUri, { dbName: 'MarketPlace' });
  console.log('Mongoose connected to MongoDB');

  let client;
  try {
    client = await startMongoClient();
  } catch (e) {
    console.warn(
      'MongoDB unavailable — REST message routes and DB-backed socket events will not work.',
    );
    setupSocketHandlers(null);
    return;
  }

  app.locals.client = client;
  const messagesService = new MessagesService(client);

  // Mount REST routes after DB client is ready
  app.use('/messages', createMessagesRouter(app));

  // Wire Socket.IO handlers with DB access
  setupSocketHandlers(messagesService);

  app.use('/messages', requireAuth, createMessagesRouter(app));
}

setupClient();

// Add welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Marketplace API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/auth',
      users: '/users',
      listings: '/listings',
      conversations: '/conversations',
      messages: '/messages',
    },
  });
});

app.use('/listings', requireAuth, listingsRouter);
// ... rest of your routes

app.use('/listings', requireAuth, listingsRouter);
app.use('/conversations', requireAuth, conversationsRouter);
app.use('/users', usersRouter); // routes inside use requireAuth
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import type { Application } from "express";
import { startMongoClient } from "./services/mongoService.ts";
import { createMessagesRouter } from "./routes/messagesRouter.ts";
import listingsRouter from "./routes/listingsRouter.ts";
import conversationsRouter from "./routes/conversationsRoutes.ts";
import intializeSocket from "./socket.ts";

dotenv.config(); // ✅ correctly loads .env

const app: Application = express();
app.use(cors());
app.use(express.json());

async function setupClient() {
  const client = await startMongoClient();
  app.locals.client = client;

  // Mount routers after client is connected
  app.use("/messages", createMessagesRouter(app));
}

setupClient();

intializeSocket(app);

app.use("/listings", listingsRouter);
app.use("/conversations", conversationsRouter);

const PORT = process.env.PORT || 3000;

app.locals.server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
