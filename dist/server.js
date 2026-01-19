import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import blogRoutes from './routes/blogRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
dotenv.config();
const app = express();
// Port handling: Vercel assigns port, otherwise use environment variable or default
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const CORS_ORIGINS = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((s) => s.trim())
    : ['http://localhost:3000', 'http://localhost:3001'];
// Middleware
app.use(cors({
    origin: (origin, callback) => {
        // Allow non-browser requests like curl/postman (no origin)
        if (!origin)
            return callback(null, true);
        if (CORS_ORIGINS.includes(origin))
            return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Initialize database on startup
let dbConnected = false;
async function initializeDB() {
    if (!dbConnected) {
        try {
            await connectDB();
            dbConnected = true;
            console.log('✓ MongoDB connected successfully');
        }
        catch (error) {
            console.error('Database connection failed:', error);
        }
    }
}
// Middleware to ensure DB is connected on each request (for serverless)
app.use(async (req, res, next) => {
    await initializeDB();
    next();
});
// Routes
app.use('/api/blogs', blogRoutes);
// Health check
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Server is running' });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});
// Error handler middleware
app.use(errorHandler);
// For local development
if (process.env.NODE_ENV !== 'production') {
    async function startServer() {
        try {
            await connectDB();
            app.listen(PORT, () => {
                console.log(`\n✓ Server running on http://localhost:${PORT}`);
                console.log(`✓ CORS enabled for: ${CORS_ORIGINS.join(', ')}\n`);
            });
        }
        catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    }
    startServer();
}
// Export app for Vercel serverless functions
export default app;
//# sourceMappingURL=server.js.map