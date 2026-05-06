import type { Request, Response } from 'express';
import { getDocument } from '../services/usersService';
/**
 * GET /users/me
 * Returns the current authenticated user's info (no password).
 * Requires: Authorization: Bearer <token>
 */
export async function getMe(req: Request, res: Response): Promise<void> {
  const user = req.user;
  if (!user) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }
  // Return safe user fields only (passwordHash is already excluded by schema select: false)
  res.json({
    id: user._id,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
  });
}


export async function getUserDocument(req: Request, res: Response) : Promise<void> {

    const client = req.app.locals.client;

    try {
    
        const userid: string | string[] | undefined = req.params.id
    
        if (typeof userid !== "string") {
          throw new Error("Invalid username");
        }
    
        const record = await getDocument(
          client,
          userid
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
}
