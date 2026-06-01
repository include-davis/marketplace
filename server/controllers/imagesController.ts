import type { Request, Response } from 'express';
import { uploadImage } from '../services/cloudinaryService';

const ALLOWED_FOLDERS = ['listings', 'chat', 'avatars', 'uploads'];

/**
 * Handles image upload via multipart form data.
 * Expects multer middleware to have parsed `req.file`.
 *
 * Body fields:
 *   folder (optional) – Cloudinary sub-folder; defaults to 'uploads'.
 */
export const uploadImageController = async (req: Request, res: Response) => {
  try {
    // Multer attaches the file to req.file
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'No image file provided. Send a file under the "file" field.',
      });
      return;
    }

    // Validate folder against allow-list, default to 'uploads'
    const folder: string =
      req.body.folder && ALLOWED_FOLDERS.includes(req.body.folder)
        ? req.body.folder
        : 'uploads';

    const { url, publicId } = await uploadImage(req.file.buffer, folder);

    res.status(200).json({
      success: true,
      data: { url, publicId },
    });
  } catch (e: unknown) {
    console.error('Image upload error:', e);
    const message =
      e instanceof Error
        ? e.message
        : typeof e === 'object' && e !== null && 'message' in e
          ? String((e as any).message)
          : String(e);
    res.status(500).json({
      success: false,
      message,
    });
  }
};
