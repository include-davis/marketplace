import jwt, { SignOptions } from "jsonwebtoken";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "30m";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET missing from env");
  return secret;
}

export function signJWT(userId: string) {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };

  return jwt.sign({ sub: userId }, getSecret(), options);
}

export function verifyJWT(token: string) {
  return jwt.verify(token, getSecret()) as { sub: string };
}