import type { Request, Response } from 'express';
import {
  addConversation,
  getConversationByListing,
} from '../services/conversationService';

export const addConversationController = async (
  req: Request,
  res: Response,
) => {
  const client = req.app.locals.client;

  try {
    const record = await addConversation(
      client,
      req.body.user1id,
      req.body.user2id,
      req.body.listingId,
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

export async function getConversationByListingController(
  req: Request,
  res: Response,
) {
  const client = req.app.locals.client;

  try {
    const listingId: string | string[] | undefined = req.params.listingId;

    if (typeof listingId !== 'string') {
      throw new Error('Invalid listing ID');
    }

    const record = await getConversationByListing(client, listingId);
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
}
