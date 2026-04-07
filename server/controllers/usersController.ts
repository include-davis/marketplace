import type { Request, Response } from "express";

/**
 * GET /users/me
 * Returns the current authenticated user's info (no password).
 * Requires: Authorization: Bearer <token>
 */
export async function getMe(req: Request, res: Response): Promise<void> {
  const user = req.user;
  if (!user) {
    res.status(401).json({ message: "Not authenticated" });
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
