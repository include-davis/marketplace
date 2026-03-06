import { Router } from "express";
import { getMe } from "../controllers/usersController.ts";
import { requireAuth } from "../auth/middleware.ts";

const router = Router();

// All user routes require authentication
router.use(requireAuth);
router.get("/me", getMe);

export default router;
