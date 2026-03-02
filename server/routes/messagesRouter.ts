import { Router } from "express";
import type { Application } from "express";
import { MessagesController } from "../controllers/messagesController.ts";
import { MessagesService } from "../services/messagesService.ts";

export function createMessagesRouter(app: Application): Router {
  const router = Router();
  
  // Get MongoDB client from app.locals
  const client = app.locals.client;
  
  // Initialize service and controller
  const messagesService = new MessagesService(client);
  const messagesController = new MessagesController(messagesService);

  // Define routes
  router.get("/test/feature", messagesController.Testing)
  router.get("/:conversationId", messagesController.getMessages);
  router.post("/", messagesController.createMessage);


  return router;
}
