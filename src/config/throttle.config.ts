export const throttleConfig = () => ({
    throttle: {
        ttl: parseInt(process.env.THROTTLE_TTL),
        limit: parseInt(process.env.THROTTLE_LIMIT)
    },
});