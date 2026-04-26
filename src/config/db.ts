import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/proximity';

export const connectMongoDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoUri);
        console.log('✅ MongoDB Connected');

        // Drop stale email_1 index if it exists (causes duplicate key errors)
        try {
            const db = mongoose.connection.db;
            if (db) {
                const collections = await db.listCollections({ name: 'users' }).toArray();
                if (collections.length > 0) {
                    const indexes = await db.collection('users').indexes();
                    const hasEmailIndex = indexes.some((idx: any) => idx.name === 'email_1');
                    if (hasEmailIndex) {
                        await db.collection('users').dropIndex('email_1');
                        console.log('🧹 Dropped stale email_1 index from users collection');
                    }
                }
            }
        } catch (indexErr) {
            // Non-fatal: index may already be gone
        }

    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        throw error;
    }
};

export const disconnectMongoDB = async (): Promise<void> => {
    await mongoose.disconnect();
    console.log('MongoDB Disconnected');
};
