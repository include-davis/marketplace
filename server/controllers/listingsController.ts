import type { Request, Response } from 'express';
import {
    createListing,
    deleteListing,
    getAllListings,
    getListing,
    updateListing,
} from '../services/listingsService.ts';

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

        const record = await createListing(client, title,
            desc, price, category, stock);

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

        const record = await updateListing(client, id, 
            title, desc, price, category, stock);

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
