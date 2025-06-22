import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMyFriends, getRecommendedUsers } from '../controller/user.controller.js';

const router = express.Router();

router.use(protectRoute); //all routes in this file will require authentication

router.get('/', getRecommendedUsers);
router.get('/friends', getMyFriends);

export default router;