import { Router } from 'express';
const router = Router();

import {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} from '../../controllers/thoughtController.js'

// Route: /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// Route: /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

export { router as thoughtRouter };