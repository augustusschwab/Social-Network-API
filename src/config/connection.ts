import mongoose from 'mongoose';

const db = async(): Promise<typeof mongoose.connection> => {
    try{
        await mongoose.connect(process.env.MONGODB_URI ||'mongodb://127.0.0.1:27017/socialNetworkDB');
        console.log('Database connected.')
        return mongoose.connection;
    } catch(err) {
        console.error('Database connection error:', err);
        throw new Error('Database connection failed.');
    }
}

export default db;