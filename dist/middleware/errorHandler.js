export function errorHandler(err, req, res, next) {
    console.error('Error:', err);
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((error) => error.message);
        return res.status(400).json({ success: false, message: messages });
    }
    // Mongoose duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: `${Object.keys(err.keyValue)[0]} already exists`
        });
    }
    // Default error
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
}
//# sourceMappingURL=errorHandler.js.map