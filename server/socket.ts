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
            receiverIds: string[],
            message: string,
            image?: string | null
        }) => {
            const { conversationId, senderId, receiverIds, message, image } = data

            if (!messagesService) {
                socket.emit('error', { message: 'Database not available' })
                return
            }

            // Validate ObjectId format (must be 24-character hex string)
            const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id)
            
            if (!isValidObjectId(conversationId)) {
                socket.emit('error', { message: `Invalid conversationId: must be 24-character hex string, got "${conversationId}" (${conversationId.length} chars)` })
                return
            }
            if (!isValidObjectId(senderId)) {
                socket.emit('error', { message: `Invalid senderId: must be 24-character hex string, got "${senderId}" (${senderId.length} chars)` })
                return
            }
            for (const receiverId of receiverIds) {
                if (!isValidObjectId(receiverId)) {
                    socket.emit('error', { message: `Invalid receiverId: must be 24-character hex string, got "${receiverId}" (${receiverId.length} chars)` })
                    return
                }
            }

            try {
                const newMessage = await messagesService.createMessage({
                    conversationId,
                    senderId,
                    receiverIds,
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


