import type { Application } from "express"
import { createServer} from "http"
import { Server } from "socket.io"


const intializeSocket = (app: Application) => {

    const server = createServer(app)
    const io = new Server(server)

    app.locals.server = server

io.on('connection', (socket) => {
    console.log('a user connected')
    
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', (msg)) //send msg to the client
    });
})

}

export default intializeSocket


