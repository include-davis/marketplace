import type { Request, Response } from 'express';
import { getImagesByFolder } from '../services/cloudinaryService';

/**
 * Get all images from folder
 * @param req Express Request — expects `req.params.id`
 * @param res Express Response
 */
export const getImagesController = async (req: Request, res: Response) => {
  try {
    const id: string | undefined | string[] = req.params.id;

    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      res.status(400).json({
        success: false,
        message: 'Image folder ID is required.',
      });
      return;
    }

    const images = await getImagesByFolder(id);

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e: unknown) {
    console.error('Cloudinary error:', e);

    let message = 'An unknown error occurred.';
    if (e instanceof Error) {
      message = e.message;
    } else if (
      e &&
      typeof e === 'object' &&
      'error' in e &&
      (e as Record<string, unknown>).error
    ) {
      // { error: { message: 'some error' } }
      const inner = (e as Record<string, { message?: string }>).error;
      message = inner?.message || JSON.stringify(e);
    } else if (typeof e === 'string') {
      message = e;
    } else {
      message = JSON.stringify(e);
    }

    res.status(400).json({
      success: false,
      message,
    });
  }
};
