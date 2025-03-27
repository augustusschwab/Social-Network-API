import { Router } from 'express';
const router = Router();

import {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} from '../../controllers/thoughtController.js'

// Route: /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// Route: /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

// Route: /api/thoughts/:thoughId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// Route: /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

export { router as thoughtRouter };