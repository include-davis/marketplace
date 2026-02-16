import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import type { Application } from "express"
import { startMongoClient } from "./services/mongoService.ts"
import { loadEnvFile } from "process"
import { createMessagesRouter } from "./routes/messagesRouter.ts"
import listingsRouter from "./routes/listingsRouter.ts"
import conversationsRouter from "./routes/conversationsRoutes.ts"
import authRouter from "./auth/authRoutes.ts"
import { requireAuth } from "./auth/middleware.ts";

//loadEnvFile(".env") //load env file
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
    ///////
    const mongoUri = process.env.MONGO_CONNECTION_STRING || "";

    await mongoose.connect(mongoUri, { dbName: "MarketPlace" });
    console.log("Mongoose connected to MongoDB");
    ///////
    const client = await startMongoClient();
    app.locals.client = client;
    
    // Mount routers after client is connected
    app.use("/messages", createMessagesRouter(app));
}

app.use("/listings", requireAuth, listingsRouter);
app.use("/conversations", requireAuth, conversationsRouter)
app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;

/*
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
*/

setupClient().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
}).catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
});