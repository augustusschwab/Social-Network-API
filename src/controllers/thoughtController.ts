import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

// Get all Thoughts - returns an array of thoughts.
export const getAllThoughts = async (_req: Request, res: Response) => {
    try{
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err: any) {
        res.status(500).json({
            message: err.message
        });
    };
};

// Get a Thought by id - returns a single thought.
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try{
        const thought = await Thought.findById(thoughtId);
        res.json(thought);
    } catch(err: any) {
        res.status(500).json({
            message: err.message
        });
    };
};

// Create a thought.
export const createThought = async (req: Request, res: Response) => {
    try{
        const thought = await Thought.create(req.body);

        // Find the user and update the thought array.
        const updatedUser = await User.findOneAndUpdate(
            { username: req.body.username },
            { $push: { thoughts: thought._id } },
            { runValidators: true, new: true }
        );

        if(!updatedUser){
            res.status(404).json({ message: 'User not found.' });
        }

        res.json(thought);
    } catch(err: any) {
        res.status(500).json(err);
    };
};

// Update a thought by id.
export const updateThought = async (req: Request, res: Response) => {
    try{
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thought },
            { $set: req.body },
            { new: true, runValidators: true }
        )

        if(!thought){
            res.status(404).json({ message: 'Thought not found.' })
        }

        res.json(thought);
    } catch(err: any) {
        res.status(500).json({
            message: err.message
        });
    };
};

// Delete a thought by id.
export const deleteThought = async (req: Request, res: Response) => {
    try{
        const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});

        if(!thought){
            res.status(404).json({ message: 'Thought not found.' });
        }

        return res.json({ message: 'Thought deleted' });
    } catch(err) {
        return res.status(500).json(err);
    }
}