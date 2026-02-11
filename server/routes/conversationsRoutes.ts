//router for the 'conversations' collection
import {Router, type Request, type Response} from "express";
import { getConversationController, addConversationController } from "../controllers/conversationsControllers.ts";

const conversationsRouter = Router()

conversationsRouter.get("/:user1id/:user2id", (req: Request, res: Response) => {getConversationController(req, res)})
conversationsRouter.post("/", (req: Request, res: Response) => {addConversationController(req, res)})

export default conversationsRouter