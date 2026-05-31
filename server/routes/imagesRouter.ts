import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import { uploadImageController } from '../controllers/imagesController.ts';

// Store files in memory as Buffers (no disk writes needed)
const upload = multer({ storage: multer.memoryStorage() });

const imagesRouter = Router();

/**
 * POST /images/upload
 * Accepts a multipart form with a single "file" field + optional "folder" text field.
 */
imagesRouter.post(
  '/upload',
  upload.single('file'),
  (req: Request, res: Response) => uploadImageController(req, res),
);

export default imagesRouter;
