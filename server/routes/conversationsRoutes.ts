//router for the 'conversations' collection
import { Router, type Request, type Response } from 'express';
import {
  addConversationController,
  getConversationByListingController,
} from '../controllers/conversationsControllers';

const conversationsRouter = Router();

conversationsRouter.post('/', (req: Request, res: Response) => {
  //adds conversation document
  addConversationController(req, res);
});

conversationsRouter.get('/:listingId', (req: Request, res: Response) => {
  //gets conversation by listing id
  getConversationByListingController(req, res);
});

//gets all conversations by user
export default conversationsRouter;
