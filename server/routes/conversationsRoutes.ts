//router for the 'conversations' collection
import { Router, type Request, type Response } from 'express';
import {
  addConversationController,
  getConversationByListingController,
  getConversationByUserController,
} from '../controllers/conversationsControllers';

const conversationsRouter = Router();

conversationsRouter.post('/', (req: Request, res: Response) => {
  //adds conversation document
  addConversationController(req, res);
});

conversationsRouter.get(
  '/listing/:listingId',
  (req: Request, res: Response) => {
    //gets conversation by listing id
    getConversationByListingController(req, res);
  },
);

conversationsRouter.get('/user/:userId', (req: Request, res: Response) => {
  //gets conversation by user
  getConversationByUserController(req, res);
});

//gets all conversations by user
export default conversationsRouter;
