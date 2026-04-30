import { Router, type Request, type Response } from 'express';
import {
  getAllListingsController,
  getListingController,
  createListingController,
  updateListingController,
  deleteListingController,
  uploadPhotoController,
} from '../controllers/listingsController.ts';
import { uploadListingImages } from '../services/multerService.js';

const listingsRouter = Router();

listingsRouter.get('/', (req: Request, res: Response) =>
  getAllListingsController(req, res),
);
listingsRouter.get('/:id', (req: Request, res: Response) =>
  getListingController(req, res),
);
listingsRouter.post('/', (req: Request, res: Response) =>
  createListingController(req, res),
);
listingsRouter.put('/:id', (req: Request, res: Response) =>
  updateListingController(req, res),
);
listingsRouter.delete('/:id', (req: Request, res: Response) =>
  deleteListingController(req, res),
);
listingsRouter.post(
  '/:id/image',
  uploadListingImages.array('images', 5),
  (req: Request, res: Response) => uploadPhotoController(req, res),
);
export default listingsRouter;
