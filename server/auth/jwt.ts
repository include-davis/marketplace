import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN ?? "30m";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET missing from env");
  return secret;
}

export function signJWT(userId: string) {
  const options = { expiresIn: JWT_EXPIRES_IN } as SignOptions;

  //Create token that has the user's id, lock it with the secret, and make it expire later
  return jwt.sign({ sub: userId }, getSecret(), options);
}

//Check if token is real, unlock it using secret, and return the payload (which contains the user's id) 
export function verifyJWT(token: string) {
  return jwt.verify(token, getSecret()) as { sub: string };
}