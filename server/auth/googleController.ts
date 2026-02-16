import { Request, Response } from "express";
import axios from "axios";
import { User } from "../models/User";
import { signJWT } from "./jwt";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo";

export async function googleCallback(req: Request, res: Response) {
  try {
    //Google sends code 
    const code = req.query.code as string;
    if (!code) return res.status(400).json({ message: "Missing code" });

    // Exchange code for tokens
    const tokenRes = await axios.post(
      GOOGLE_TOKEN_URL,
      {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        grant_type: "authorization_code",
        code,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const { access_token } = tokenRes.data;

    // Fetch Google profile
    const profileRes = await axios.get(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { sub, email } = profileRes.data;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        google: { sub, email },
        isEmailVerified: true,
      });
    }

    const jwt = signJWT(user.id);

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    res.redirect(frontendUrl + "/auth/callback?token=" + jwt);

  } catch (err) {
  console.log("Google login failed:", err);
  res.status(500).json({ message: "Google login failed" });
  }

}