import { Router } from "express";
import { googleCallback } from "./googleController";
import { register, login } from "./authController";
import { requireAuth } from "./middleware";

const router = Router();

//Public routes
router.post("/register", register);
router.post("/login", login);

//Google OAuth: redirect to Google, then callback exchanges code for token
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

router.get("/google/callback", googleCallback);

export default router;
