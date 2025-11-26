import express from 'express';
import {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} from '../models/carModel.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

function validateCarData(data) {
  const errors = [];

  if (!data.year || !Number.isInteger(data.year) || data.year < 1886 || data.year > new Date().getFullYear() + 1) {
    errors.push('Année invalide');
  }
  if (!data.make || typeof data.make !== 'string' || data.make.trim() === '') {
    errors.push('Marque obligatoire');
  }
  if (!data.model || typeof data.model !== 'string' || data.model.trim() === '') {
    errors.push('Modèle obligatoire');
  }
  if (!data.series || typeof data.series !== 'string' || data.series.trim() === '') {
    errors.push('Série obligatoire');
  }
  if (data.mileage == null || !Number.isInteger(data.mileage) || data.mileage < 0) {
    errors.push('Kilométrage invalide');
  }
  if (!data.location_city || typeof data.location_city !== 'string' || data.location_city.trim() === '') {
    errors.push('Ville obligatoire');
  }
  if (!data.location_branch || typeof data.location_branch !== 'string' || data.location_branch.trim() === '') {
    errors.push('Branche obligatoire');
  }
  if (
    data.sale_price == null ||
    isNaN(Number(data.sale_price)) ||
    Number(data.sale_price) < 0
  ) {
    errors.push('Prix de vente invalide');
  }
  if (!data.stock_number || typeof data.stock_number !== 'string' || data.stock_number.trim() === '') {
    errors.push('Numéro de stock obligatoire');
  }
  if (!data.vin || typeof data.vin !== 'string' || data.vin.trim() === '') {
    errors.push('VIN obligatoire');
  }
  if (!data.transmission || typeof data.transmission !== 'string' || data.transmission.trim() === '') {
    errors.push('Transmission obligatoire');
  }
  if (!data.fuel_type || typeof data.fuel_type !== 'string' || data.fuel_type.trim() === '') {
    errors.push('Type de carburant obligatoire');
  }
  if (
    data.cylinders == null ||
    !Number.isInteger(data.cylinders) ||
    data.cylinders <= 0
  ) {
    errors.push('Nombre de cylindres invalide');
  }
  if (!Array.isArray(data.photos)) {
    errors.push('Photos doivent être un tableau');
  } else {
    for (const url of data.photos) {
      if (typeof url !== 'string' || url.trim() === '') {
        errors.push('Chaque photo doit être une URL valide');
        break;
      }
    }
  }

  return errors;
}

// GET /api/cars?name=&vin=
router.get('/', async (req, res, next) => {
  try {
    const filters = {
      name: req.query.name ? req.query.name.trim() : undefined,
      vin: req.query.vin ? req.query.vin.trim() : undefined,
    };
    const cars = await getAllCars(filters);
    res.json(cars);
  } catch (error) {
    next(error);
  }
});

// GET /api/cars/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }
    const car = await getCarById(id);
    if (!car) {
      return res.status(404).json({ message: 'Voiture non trouvée' });
    }
    res.json(car);
  } catch (error) {
    next(error);
  }
});

// POST /api/cars (admin only)
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const carData = req.body;
    const errors = validateCarData(carData);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Données invalides', errors });
    }
    const newCar = await createCar(carData);
    res.status(201).json(newCar);
  } catch (error) {
    next(error);
  }
});

// PUT /api/cars/:id (admin only)
router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }
    const carData = req.body;
    const errors = validateCarData(carData);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Données invalides', errors });
    }
    const updatedCar = await updateCar(id, carData);
    if (!updatedCar) {
      return res.status(404).json({ message: 'Voiture non trouvée' });
    }
    res.json(updatedCar);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/cars/:id (admin only)
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }
    const success = await deleteCar(id);
    if (!success) {
      return res.status(404).json({ message: 'Voiture non trouvée' });
    }
    res.json({ message: 'Voiture supprimée avec succès' });
  } catch (error) {
    next(error);
  }
});

export default router;
