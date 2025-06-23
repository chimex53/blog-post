import 'dotenv/config';
import express, { json, static as expressStatic } from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import blogRoutes from './routes/blogRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(json());
app.use('/uploads', expressStatic(join(__dirname, 'uploads')));

// API routes
app.use('/api/blogs', blogRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});