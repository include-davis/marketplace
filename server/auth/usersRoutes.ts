import { Router } from "express";
import { me } from "./usersController";
import { requireAuth } from "./middleware";

const router = Router();

router.get("/me", requireAuth, me);

export default router;