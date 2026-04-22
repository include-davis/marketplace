//router for the 'conversations' collection
import { Router, type Request, type Response } from 'express';
import {
  getConversationController,
  addConversationController,
  getConversationsByUserController
} from '../controllers/conversationsControllers.ts';

const conversationsRouter = Router();

conversationsRouter.get('/:user1id/:user2id', (req: Request, res: Response) => {
  getConversationController(req, res);
});
conversationsRouter.post('/', (req: Request, res: Response) => {
  addConversationController(req, res);
});

conversationsRouter.get('/:username', (req: Request, res: Response) => {
  getConversationsByUserController(req, res);
})

//gets all conversations by user
export default conversationsRouter;
