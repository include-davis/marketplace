import { verifyJWT } from "../auth/jwt";
import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.sendStatus(401);

  const token = header.replace("Bearer ", "");
  try {
    const payload = verifyJWT(token);
    const user = await User.findById(payload.sub);
    if (!user) return res.sendStatus(401);

    req.user = user;
    next();
  } catch {
    return res.sendStatus(401);
  }
}