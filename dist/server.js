import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import blogRoutes from './routes/blogRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
dotenv.config();
const app = express();
/* -------------------- CONFIG -------------------- */
const PORT = Number(process.env.PORT) || 5000;
const CORS_ORIGINS = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
    : ['http://localhost:3000', 'http://localhost:3001'];
/* -------------------- MIDDLEWARE -------------------- */
app.use(cors({
    origin: (origin, callback) => {
        // Allow server-to-server / Postman / curl
        if (!origin)
            return callback(null, true);
        if (CORS_ORIGINS.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* -------------------- DATABASE (SERVERLESS SAFE) -------------------- */
let isDBConnected = false;
async function ensureDB() {
    if (!isDBConnected) {
        await connectDB();
        isDBConnected = true;
        console.log('✓ MongoDB connected');
    }
}
// Ensure DB connection for every request (cold starts)
app.use(async (_req, _res, next) => {
    await ensureDB();
    next();
});
/* -------------------- ROUTES -------------------- */
// IMPORTANT: prefix with /api for Vercel
app.use('/api/blogs', blogRoutes);
// Health check
app.get('/api/health', (_req, res) => {
    res.json({ success: true, message: 'Server is running' });
});
/* -------------------- ERROR HANDLING -------------------- */
// 404 handler (keep AFTER routes)
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});
app.use(errorHandler);
/* -------------------- LOCAL SERVER ONLY -------------------- */
// DO NOT start server on Vercel
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`✓ Local server running on http://localhost:${PORT}`);
        console.log(`✓ CORS allowed: ${CORS_ORIGINS.join(', ')}`);
    });
}
/* -------------------- EXPORT FOR VERCEL -------------------- */
export default app;
//# sourceMappingURL=server.js.map