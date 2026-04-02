import type { Request, Response } from 'express';
import {
    createListing,
    deleteListing,
    getAllListings,
    getListing,
    updateListing,
} from '../services/listingService.ts';

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
        const id: string = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
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
    const sellerId = (req as any).user?._id?.toString();
    if (!sellerId) {
        res.status(401).json({ success: false, message: "Not authenticated" });
        return;
    }
    try {
        const title: string = req.body.title;
        const desc: string = req.body.desc;
        const price: number = req.body.price;
        const category: string = req.body.category;
        const stock: number = req.body.stock;

        const record = await createListing(client, sellerId, title, desc, price, category, stock);

        res.status(201).json({
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
    const sellerId = (req as any).user?._id?.toString();
    if (!sellerId) {
        res.status(401).json({ success: false, message: "Not authenticated" });
        return;
    }
    try {
        const id: string = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const title: string = req.body.title;
        const desc: string = req.body.desc;
        const price: number = req.body.price;
        const category: string = req.body.category;
        const stock: number = req.body.stock;

        const result = await updateListing(client, id, sellerId, title, desc, price, category, stock);

        if (result.matchedCount === 0) {
            res.status(403).json({
                success: false,
                message: "Listing not found or you are not the owner",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: { id, updated: true },
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
    const sellerId = (req as any).user?._id?.toString();
    if (!sellerId) {
        res.status(401).json({ success: false, message: "Not authenticated" });
        return;
    }
    try {
        const id: string = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const result = await deleteListing(client, id, sellerId);
        if (result.deletedCount === 0) {
            res.status(403).json({
                success: false,
                message: "Listing not found or you are not the owner",
            });
            return;
        }
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
