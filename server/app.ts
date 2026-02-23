import express from "express"
import cors from "cors"
import type { Application } from "express"
import { startMongoClient } from "./services/mongoService.ts"
import { loadEnvFile } from "process"
import { createMessagesRouter } from "./routes/messagesRouter.ts"
import listingsRouter from "./routes/listingsRouter.ts"
import conversationsRouter from "./routes/conversationsRoutes.ts"
import { createServer} from "http"
import { Server } from "socket.io"



loadEnvFile(".env") //load env file

const app: Application = express()
app.use(cors())
app.use(express.json())

const server = createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('a user connected')
})



async function setupClient() { //connect to mongo client
    const client = await startMongoClient();
    app.locals.client = client;
    
    // Mount routers after client is connected
    app.use("/messages", createMessagesRouter(app));
}

setupClient()

app.use("/listings", listingsRouter);
app.use("/conversations", conversationsRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)


})
