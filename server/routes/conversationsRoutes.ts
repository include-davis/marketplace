//router for the 'conversations' collection
import {Router, type Request, type Response} from "express";
import { getConversationController } from "../controllers/conversationsControllers.ts";

const conversationsRouter = Router()

    //controller -> get conversation document of both users. This will return the conversation id we will use to query messages
conversationsRouter.get("/:user1id/:user2id", (req: Request, res: Response) => {getConversationController(req, res)})

conversationsRouter.post("/", (req: Request, res: Response) => {

})

export default conversationsRouter