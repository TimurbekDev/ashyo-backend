export const redisConfig = () => ({
    redis: {
        port: parseInt(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
    },
});