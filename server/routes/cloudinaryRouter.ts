import { Router, type Request, type Response } from 'express';
import { getImagesController } from '../controllers/cloudinaryController.ts';

const cloudinaryRouter = Router();

cloudinaryRouter.get('/:id', (req: Request, res: Response) =>
  getImagesController(req, res),
);

export default cloudinaryRouter;
