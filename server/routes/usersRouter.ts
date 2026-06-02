import { Router } from 'express';
import { getMe, getUserDocument } from '../controllers/usersController';
import { requireAuth } from '../auth/middleware';

const router = Router();

// All user routes require authentication
router.use(requireAuth);
router.get('/me', getMe);
router.get('/:id', getUserDocument); //gets the entire user document of a user by ID
export default router;
