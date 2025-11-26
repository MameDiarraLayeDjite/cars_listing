import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import carRoutes from './routes/carRoutes.js';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Créer le dossier d'uploads s'il n'existe pas
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
import { existsSync, mkdirSync } from 'fs';
if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir, { recursive: true });
}

// Servir les fichiers statiques du dossier public
app.use('/uploads', express.static(uploadsDir, {
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000');
  }
}));

app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ressource non trouvée' });
});

// Error handling middleware
app.use(errorHandler);

export default app;
