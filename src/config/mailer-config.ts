export const mailerConfig = () => ({
    email: {
        port: process.env.EMAIL_PORT,
        host: process.env.EMAIL_HOST,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})