import { Router } from 'express';
const router = Router();

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} from '../../controllers/userController.js'

// Route: /api/users
router.route('/').get(getAllUsers).post(createUser);

// Route: /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// Route: /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

export { router as userRouter };