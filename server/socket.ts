import type { Application } from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import type { MessagesService } from "./services/messagesService.ts"

// Module-level io so setupSocketHandlers can reference it
let io: Server

/**
 * Creates the HTTP server and Socket.IO instance.
 * Must be called before server.listen().
 * Stores server + io on app.locals for access elsewhere.
 */
export const initializeSocket = (app: Application) => {
    const server = createServer(app)
    io = new Server(server, { cors: { origin: "*" } })

    app.locals.server = server
    app.locals.io = io

    return server
}

/**
 * Wires up all Socket.IO event handlers.
 * Called after the DB client is ready (or with null if DB is unavailable).
 */
export const setupSocketHandlers = (messagesService: MessagesService | null) => {
    io.on('connection', (socket) => {
        console.log('a user connected:', socket.id)

        // Client joins a room identified by conversationId
        socket.on('join_room', (conversationId: string) => {
            socket.join(conversationId)
            console.log(`Socket ${socket.id} joined room: ${conversationId}`)
        })

        // Client sends a message — persist to DB then broadcast to the room
        socket.on('send_message', async (data: {
            conversationId: string,
            senderId: string,
            receiverId: string,
            message: string,
            image?: string | null
        }) => {
            const { conversationId, senderId, receiverId, message, image } = data

            if (!messagesService) {
                socket.emit('error', { message: 'Database not available' })
                return
            }

            try {
                const newMessage = await messagesService.createMessage({
                    conversationId,
                    senderId,
                    receiverId,
                    message,
                    image,
                })
                // Broadcast saved message (with _id + createdAt) to everyone in the room
                io.to(conversationId).emit('receive_message', newMessage)
            } catch (err) {
                console.error('Error saving socket message:', err)
                socket.emit('error', { message: 'Failed to save message' })
            }
        })

        socket.on('disconnect', () => {
            console.log('user disconnected:', socket.id)
        })
    })
}


