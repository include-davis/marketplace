import express from "express"
import cors from "cors"
import type { Application } from "express"
import { startMongoClient } from "./services/mongoService.ts"
import { loadEnvFile } from "process"
import { createMessagesRouter } from "./routes/messagesRouter.ts"
import listingsRouter from "./routes/listingsRouter.ts"
import conversationsRouter from "./routes/conversationsRoutes.ts"
import { initializeSocket, setupSocketHandlers } from "./socket.ts"
import { MessagesService } from "./services/messagesService.ts"

try { loadEnvFile(".env") } catch { console.warn("No .env file found, continuing with process environment variables") }

const app: Application = express()
app.use(cors())
app.use(express.json())

// Create HTTP server + Socket.IO — must happen before listen()
const server = initializeSocket(app)

async function setupClient() {
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
}

setupClient()

app.use("/listings", listingsRouter);
app.use("/conversations", conversationsRouter)

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

