import type { Request, Response } from 'express';
import {
  createListing,
  deleteListing,
  getAllListings,
  getListing,
  updateListing,
  addListingImages,
} from '../services/listingService.ts';
import { generateUploadSignature } from '../services/cloudinaryService.ts';

/**
 *
 * @param req Express Request
 * @param res Express Response
 */
export const getAllListingsController = async (req: Request, res: Response) => {
  const client = req.app.locals.client;
  try {
    const records = await getAllListings(client);
    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).json({
        success: false,
        message: e.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "couldn't get error message",
      });
    }
  }
};

/**
 *
 * @param req Express Request
 * @param res Express Response
 */
export const getListingController = async (req: Request, res: Response) => {
  const client = req.app.locals.client;
  try {
    const id: string = req.params.id;
    const record = await getListing(client, id);
    res.status(200).send({
      success: true,
      data: record,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).json({
        success: false,
        message: e.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "couldn't get error message",
      });
    }
  }
};

/**
 *
 * @param req Express Request
 * @param res Express Response
 */
export const createListingController = async (req: Request, res: Response) => {
  const client = req.app.locals.client;
  try {
    const userId: string = req.body.userId;
    const title: string = req.body.title;
    const desc: string = req.body.desc;
    const price: number = req.body.price;
    const category: string = req.body.category;
    const stock: number = req.body.stock;

    const record = await createListing(
      client,
      title,
      desc,
      price,
      category,
      stock,
    );

    res.status(200).json({
      success: true,
      data: record,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).json({
        success: false,
        message: e.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "couldn't get error message",
      });
    }
  }
};

/**
 *
 * @param req Express Request
 * @param res Express Response
 */
export const updateListingController = async (req: Request, res: Response) => {
  const client = req.app.locals.client;
  try {
    const id: string = req.params.id;
    const userId: string = req.body.userId;
    const title: string = req.body.title;
    const desc: string = req.body.desc;
    const price: number = req.body.price;
    const category: string = req.body.category;
    const stock: number = req.body.stock;

    const record = await updateListing(
      client,
      id,
      title,
      desc,
      price,
      category,
      stock,
    );

    res.status(200).json({
      success: true,
      data: record,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).json({
        success: false,
        message: e.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "couldn't get error message",
      });
    }
  }
};

/**
 *
 * @param req Express Request
 * @param res Express Response
 */
export const deleteListingController = async (req: Request, res: Response) => {
  const client = req.app.locals.client;
  try {
    const id: string = req.params.id;
    await deleteListing(client, id);
    res.status(200).json({
      success: true,
      data: id,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).json({
        success: false,
        message: e.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "couldn't get error message",
      });
    }
  }
};

/**
 * Returns signed upload params for the frontend to upload directly to Cloudinary.
 */
export const getUploadSignatureController = async (_req: Request, res: Response) => {
  try {
    const signatureData = generateUploadSignature('listings');
    res.status(200).json({
      success: true,
      data: signatureData,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).json({
        success: false,
        message: e.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "couldn't get error message",
      });
    }
  }
};

/**
 * Saves Cloudinary image URLs to a listing in MongoDB.
 * Called by the frontend after uploading directly to Cloudinary.
 */
export const uploadPhotoController = async (req: Request, res: Response) => {
  const client = req.app.locals.client;
  try {
    const id: string = req.params.id;
    const { imageUrls } = req.body;

    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
      res.status(400).json({
        success: false,
        message: 'No image URLs provided.',
      });
      return;
    }

    if (imageUrls.length > 5) {
      res.status(400).json({
        success: false,
        message: 'A listing can have at most 5 images.',
      });
      return;
    }

    const record = await addListingImages(client, id, imageUrls);
    res.status(200).json({
      success: true,
      data: { ...record, imageUrls },
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).json({
        success: false,
        message: e.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "couldn't get error message",
      });
    }
  }
};

