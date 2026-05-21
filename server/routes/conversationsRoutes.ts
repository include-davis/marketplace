//router for the 'conversations' collection
import { Router, type Request, type Response } from 'express';
import {
  addConversationController,
  getConversationsByUserController
} from '../controllers/conversationsControllers';

const conversationsRouter = Router();

conversationsRouter.post('/', (req: Request, res: Response) => { //adds conversation document
  addConversationController(req, res);
});

conversationsRouter.get('/:userid', (req: Request, res: Response) => { //gets all conversations by username
  getConversationsByUserController(req, res); 
})

//gets all conversations by user
export default conversationsRouter;
