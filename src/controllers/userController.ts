import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

// Get All Users - returns and array of users.
export const getAllUsers = async (_req: Request, res: Response) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch(err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Get User by ID - returns a single user.
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: 'No user with this id.' });
        }
        return res.json(user);
    } catch(err: any) {
        return res.status(500).json({ message: err.message });
    }
};

// Create a User.
export const createUser = async (req: Request, res: Response) => {
    try{
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Update a User based on id.
export const updateUser = async (req: Request, res: Response) => {
    try{
        const user = await User.findOneAndUpdate(
            { _id: req.params.user },
            { $set: req.body },
            { runValidators: true, new: true}
        );

        if(!user){
            return res.status(404).json({ message: 'No user with this id.'})
        }

        return res.json(user);
    } catch(err: any) {
        return res.status(400).json({ message: err.message });
    };
};

// Delete User based on id.
export const deleteUser = async (req: Request, res: Response) => {
    try{
        const user = await User.findOneAndDelete({_id: req.params.userId});
        
        if(!user){
            return res.status(404).json({message: 'Could not find user.'});
        } else {
            await Thought.deleteMany({username: user.username})
            return res.json({message: 'User and thoughts deleted.'})
        }
    } catch(err) {
        return res.status(500).json(err);
    }
};

// Add a friend to a user.
export const addFriend = async (req: Request, res: Response) => {
    try{
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: {friends: req.params.friendId}},
        );

        if(!user){
            return res.status(404).json({ message: 'Could not find user.' });
        }

        return res.json({ messge: 'Friend added.' })
    } catch(err) {
        return res.status(500).json(err);
    }
};

// Remove a friend from a user.
export const removeFriend = async (req: Request, res: Response) => {
    try{
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: {friends: req.params.friendId}},
        );

        if(!user){
            return res.status(404).json({ message: 'Could not fine user.' });
        }

        return res.json({ message: 'Friend removed' });
    } catch(err) {
       return res.status(500).json(err);
    }
};


