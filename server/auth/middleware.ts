import { verifyJWT } from './jwt';
import { UserDocument } from '../models/User';
import type { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  //Read header - if no token, return 401 unauthorized
  const token = req.cookies.auth_token;
  if (!token) return res.sendStatus(401);
  
  try {
    const payload = verifyJWT(token);
    const user = await UserDocument.findById(payload.sub);
    if (!user) return res.sendStatus(401);

    //Attach user to request
    req.user = user;
    next();
  } catch {
    return res.sendStatus(401);
  }
}
