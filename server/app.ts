import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import type { Application } from "express"
import { startMongoClient } from "./services/mongoService"
import { createMessagesRouter } from "./routes/messagesRouter"
import listingsRouter from "./routes/listingsRouter"
import conversationsRouter from "./routes/conversationsRoutes"
import usersRouter from "./routes/usersRouter"
import authRouter from "./auth/authRoutes"
import { requireAuth } from "./auth/middleware";

dotenv.config()
console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);

const app: Application = express()

app.use(cors())

/*
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
*/


app.use(express.json())

async function setupClient() { //connect to mongo client
    const mongoUri = process.env.MONGO_CONNECTION_STRING || "";

    await mongoose.connect(mongoUri, { dbName: "MarketPlace" });
    console.log("Mongoose connected to MongoDB");

    const client = await startMongoClient();
    app.locals.client = client;
    
    // Mount routers after client is connected
    app.use("/messages", requireAuth, createMessagesRouter(app));
}

app.use("/listings", requireAuth, listingsRouter);
app.use("/conversations", requireAuth, conversationsRouter);
app.use("/users", usersRouter); // routes inside use requireAuth
app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;

setupClient().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
}).catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
