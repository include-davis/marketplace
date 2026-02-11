import type { Request, Response } from "express";
import { MessagesService } from "../services/messagesService.ts";
import { ObjectId } from "mongodb";

export class MessagesController {
  private messagesService: MessagesService;

  constructor(messagesService: MessagesService) {
    this.messagesService = messagesService;
  }

  /**
   * GET /messages/:conversationId
   * Fetch all messages for a given conversation
   */
  getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
      const { conversationId } = req.params;

      // Validate conversationId
      if (!conversationId) {
        res.status(400).json({ error: "conversationId is required" });
        return;
      }

      if (!ObjectId.isValid(conversationId)) {
        res.status(400).json({ error: "Invalid conversationId format" });
        return;
      }

      const messages = await this.messagesService.getMessagesByConversationId(conversationId);
      
      res.status(200).json({ messages });
    } catch (error) {
      console.error("Error in getMessages controller:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  };

  /**
   * POST /messages
   * Create and store a new message
   */
  createMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { conversationId, senderId, receiverId, message, image } = req.body;

      // Validate required fields
      if (!conversationId || !senderId || !receiverId) {
        res.status(400).json({ 
          error: "Missing required fields: conversationId, senderId, and receiverId are required" 
        });
        return;
      }

      // At least one content field (message or image) must be present
      if (!message && !image) {
        res.status(400).json({ 
          error: "At least one of 'message' or 'image' is required" 
        });
        return;
      }

      // Validate ObjectId formats
      if (!ObjectId.isValid(conversationId)) {
        res.status(400).json({ error: "Invalid conversationId format" });
        return;
      }

      if (!ObjectId.isValid(senderId)) {
        res.status(400).json({ error: "Invalid senderId format" });
        return;
      }

      if (!ObjectId.isValid(receiverId)) {
        res.status(400).json({ error: "Invalid receiverId format" });
        return;
      }

      // If message is provided, validate it's a non-empty string
      if (message && (typeof message !== "string" || message.trim().length === 0)) {
        res.status(400).json({ error: "Message must be a non-empty string" });
        return;
      }

      const newMessage = await this.messagesService.createMessage({
        conversationId,
        senderId,
        receiverId,
        message: message ? message.trim() : "",
        image: image || null,
      });

      res.status(201).json({ message: newMessage });
    } catch (error) {
      console.error("Error in createMessage controller:", error);
      res.status(500).json({ error: "Failed to create message" });
    }
  };
}
