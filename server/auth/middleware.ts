import { verifyJWT } from "./jwt";
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
  //Read header - if no token, return 401 unauthorized
  const header = req.headers.authorization;
  if (!header) return res.sendStatus(401);

  //Extract token from header, verify it, and find user with id in db
  const token = header.replace("Bearer ", "");
  try {
    const payload = verifyJWT(token);
    const user = await User.findById(payload.sub);
    if (!user) return res.sendStatus(401);

    //Attach user to request 
    req.user = user;
    next();
  } catch {
    return res.sendStatus(401);
  }
}