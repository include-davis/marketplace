import { Router } from "express";
import { googleCallback } from "./googleController";

const router = Router();

//When browser hits GET auth/google, build the url to Google's OAuth 2.0 server and redirect there
router.get("/google", (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.GOOGLE_CALLBACK_URL!,
    response_type: "code",
    scope: "openid email profile",
    prompt: "select_account",
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

//After login with Google, user is redirected to this route. Exchange code for token, find or create user in db, and issue JWT
router.get("/google/callback", googleCallback);

export default router;