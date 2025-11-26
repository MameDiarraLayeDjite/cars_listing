import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Configuration du stockage des fichiers
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// Créer le dossier s'il n'existe pas
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// Filtre pour n'accepter que les images
const imageFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error('Seules les images sont autorisées (jpeg, jpg, png, webp, gif)'));
};

const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

// Route pour l'upload d'images
router.post('/', upload.single('photo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier téléversé' });
    }

    // Construire l'URL complète de l'image
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    res.status(201).json({ 
      url: imageUrl,
      message: 'Image téléversée avec succès' 
    });
  } catch (error) {
    console.error('Erreur lors du téléversement:', error);
    res.status(500).json({ 
      error: 'Erreur lors du téléversement de l\'image',
      details: error.message 
    });
  }
});

export default router;
