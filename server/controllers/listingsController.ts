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
    const sellerId: string = req.user._id.toString();
    const title: string = req.body.title;
    const desc: string = req.body.desc;
    const price: number = req.body.price;
    const category: string = req.body.category;
    const stock: number = req.body.stock;

    const record = await createListing(
      client,
      sellerId,
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
 * Checks ownership and enforces the 5-image cap before issuing a signature.
 */
export const getUploadSignatureController = async (
  req: Request,
  res: Response,
) => {
  const MAX_IMAGES = 5;
  const client = req.app.locals.client;
  try {
    const listingId = req.params.id;
    console.log(`Upload signature requested by user: ${req.user._id}`);

    // Verify the listing exists
    const listing = await getListing(client, listingId);
    if (!listing) {
      res.status(404).json({
        success: false,
        message: `Listing with id ${listingId} not found.`,
      });
      return;
    }

    // Verify the caller owns the listing
    if (listing.sellerId !== req.user._id.toString()) {
      res.status(403).json({
        success: false,
        message: 'You do not own this listing.',
      });
      return;
    }

    // Enforce the image cap before handing out a signature
    const existingCount = Array.isArray(listing.images) ? listing.images.length : 0;
    if (existingCount >= MAX_IMAGES) {
      res.status(400).json({
        success: false,
        message: `Listing already has ${existingCount} image(s) (max ${MAX_IMAGES}). Remove an image before uploading more.`,
      });
      return;
    }

    const signatureData = generateUploadSignature(`listings/${listingId}`);

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

    // Verify the caller owns the listing
    const listing = await getListing(client, id);
    if (!listing) {
      res.status(404).json({
        success: false,
        message: `Listing with id ${id} not found.`,
      });
      return;
    }

    if (listing.sellerId !== req.user._id.toString()) {
      res.status(403).json({
        success: false,
        message: 'You do not own this listing.',
      });
      return;
    }

    // addListingImages enforces the 5-image cap
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
