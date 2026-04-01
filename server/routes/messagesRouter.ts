import { Router } from "express";
import type { Application } from "express";
import { MessagesController } from "../controllers/messagesController";
import { MessagesService } from "../services/messagesService";
import {
  listConversationsForUser,
  addConversation,
} from "../services/conversationService";
import { markConversationRead } from "../services/messagesService";

export function createMessagesRouter(app: Application): Router {
  const router = Router();

  // Get MongoDB client from app.locals
  const client = app.locals.client;

   // Initialize service and controller
  const messagesService = new MessagesService(client);
  const messagesController = new MessagesController(messagesService);

  //GET /messages/conversations - current user's DM inbox
  router.get("/conversations", async (req, res) => {
    try {
      const userId = (req as any).user?._id?.toString();
      if (!userId) {
        res.status(401).json({ error: "Not authenticated" });
        return;
      }
      const list = await listConversationsForUser(client, userId);
      res.status(200).json({ conversations: list });
    } catch (e) {
      console.error("List conversations error:", e);
      res.status(500).json({ error: "Failed to list conversations" });
    }
  });

  //GET /messages/conversations/:id - get messages in a conversation
  router.get("/conversations/:id", messagesController.getMessagesByConvId);

  //POST /messages/start/:userId - start a conversation with another user
  router.post("/start/:userId", async (req, res) => {
    try {
      const currentUserId = (req as any).user?._id?.toString();
      const otherUserId = req.params.userId;
      if (!currentUserId || !otherUserId) {
        res.status(400).json({ error: "Current user and target userId required" });
        return;
      }
      const conversationId = await addConversation(client, currentUserId, otherUserId);
      res.status(201).json({
        message: "Conversation started",
        conversationId: conversationId?.toString(),
      });
    } catch (e) {
      console.error("Start conversation error:", e);
      res.status(500).json({ error: "Failed to start conversation" });
    }
  });

  //POST /messages/send - send a message (sender from JWT)
  router.post("/send", messagesController.sendMessage);

  //PUT /messages/read/:conversationId - mark conversation as read
  router.put("/read/:conversationId", async (req, res) => {
    try {
      const userId = (req as any).user?._id?.toString();
      const { conversationId } = req.params;
      if (!userId || !conversationId) {
        res.status(400).json({ error: "conversationId required" });
        return;
      }
      await markConversationRead(client, conversationId, userId);
      res.status(200).json({ message: "Marked as read" });
    } catch (e) {
      console.error("Mark read error:", e);
      res.status(500).json({ error: "Failed to mark as read" });
    }
  });

  //DELETE /messages/delete/:messageId - delete a message (sender only)
  router.delete("/delete/:messageId", messagesController.deleteMessage);

  //Define routes
  router.get("/:conversationId", messagesController.getMessages);
  router.post("/", messagesController.createMessage);


  return router;
}
