import type { Request, Response } from "express";

export async function me(req: Request, res: Response) {
    
    const user = req.user;
    if (!user) return res.sendStatus(401);
    
    const safeUser =
      typeof (user as any).toObject === "function"
        ? (user as any).toObject()
        : user;

    const { passwordHash, ...publicUser } = safeUser;

    return res.json({ user: publicUser });
}
