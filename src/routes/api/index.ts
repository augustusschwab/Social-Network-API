import { Router } from 'express';
import { thoughtRouter } from './thoughtRoutes.js';
import { userRouter } from './userRoutes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter);

export { router as apiRoutes };