import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/User";
import { signJWT } from "./jwt";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: "Email in use" });

  const hash = await bcrypt.hash(password, 12);

  const user = await User.create({
    email,
    passwordHash: hash,
    isEmailVerified: true,
  });

  const token = signJWT(user.id);
  res.json({ message: "User created successfully", token });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user || !user.passwordHash)
    return res.status(401).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = signJWT(user.id);
  res.json({ message: "Login successful", token });
}