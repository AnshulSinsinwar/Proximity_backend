import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    corsOrigin: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',').map(s => s.trim())
        : '*'
};
