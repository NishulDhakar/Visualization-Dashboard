import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    const mongoUrl = process.env['MONGO_URL'];
    if (!mongoUrl) {
        throw new Error('MONGO_URL environment variable is not defined');
    }

    await mongoose.connect(mongoUrl);
};

export default connectDB;
