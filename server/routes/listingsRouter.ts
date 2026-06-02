import { Router, type Request, type Response } from 'express';
import {
  getAllListingsController,
  getListingController,
  createListingController,
  updateListingController,
  deleteListingController,
  addListingImageController,
  updateListingStatusController,
} from '../controllers/listingsController';
import { requireAuth } from '../auth/middleware';

const listingsRouter = Router();

listingsRouter.get('/', (req: Request, res: Response) =>
  getAllListingsController(req, res),
);
listingsRouter.get('/:id', (req: Request, res: Response) =>
  getListingController(req, res),
);

// Require auth for write operations.
listingsRouter.use(requireAuth);

listingsRouter.post('/', (req: Request, res: Response) =>
  createListingController(req, res),
);
listingsRouter.post('/:id/images', (req: Request, res: Response) =>
  addListingImageController(req, res),
);
listingsRouter.put('/:id', (req: Request, res: Response) =>
  updateListingController(req, res),
);
listingsRouter.put('/:id/status', (req: Request, res: Response) =>
  updateListingStatusController(req, res),
);
listingsRouter.delete('/:id', (req: Request, res: Response) =>
  deleteListingController(req, res),
);

export default listingsRouter;
