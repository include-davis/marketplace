import dotenv from "dotenv" 
import express from "express" 
import cors from "cors" 
import mongoose from "mongoose"; x
import type { Application } from "express" 
import { startMongoClient } from "./services/mongoService" 
import { createMessagesRouter } from "./routes/messagesRouter" 
import listingsRouter from "./routes/listingsRouter" 
import conversationsRouter from "./routes/conversationsRoutes" 
import usersRouter from "./routes/usersRouter" 
import authRouter from "./auth/authRoutes" 
import { requireAuth } from "./auth/middleware"; 
import { loadEnvFile } from "process"
import { initializeSocket, setupSocketHandlers } from "./socket.ts"
import { MessagesService } from "./services/messagesService.ts"

dotenv.config()
console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);

try { loadEnvFile(".env") } catch { console.warn("No .env file found, continuing with process environment variables") }

const app: Application = express()
app.use(cors())
app.use(express.json())

// Create HTTP server + Socket.IO — must happen before listen()
const server = initializeSocket(app)

async function setupClient() {
  
   const mongoUri = process.env.MONGO_CONNECTION_STRING || "";

    await mongoose.connect(mongoUri, { dbName: "MarketPlace" });
    console.log("Mongoose connected to MongoDB");
  
    let client;
    try {
        client = await startMongoClient();
    } catch (e) {
        console.warn("MongoDB unavailable — REST message routes and DB-backed socket events will not work.");
        setupSocketHandlers(null);
        return;
    }

    app.locals.client = client;
    const messagesService = new MessagesService(client);

    // Mount REST routes after DB client is ready
    app.use("/messages", createMessagesRouter(app));

    // Wire Socket.IO handlers with DB access
    setupSocketHandlers(messagesService);
  
    app.use("/messages", requireAuth, createMessagesRouter(app));
}

setupClient()

app.use("/listings", requireAuth, listingsRouter);
app.use("/conversations", requireAuth, conversationsRouter);
app.use("/users", usersRouter); // routes inside use requireAuth
app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
