module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'shh',
    ROUNDS: process.env.ROUNDS || 8
    // Can also put PORT and NODE_ENV here, etc.
}