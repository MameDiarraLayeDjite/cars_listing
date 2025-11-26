import request from 'supertest';
import app from '../../backend/app.js';
import * as carModel from '../../backend/models/carModel.js';
import { authMiddleware } from '../../backend/middleware/authMiddleware.js';

// Mock authMiddleware to always call next()
jest.mock('../../backend/middleware/authMiddleware.js', () => ({
  authMiddleware: (req, res, next) => next(),
}));

describe('/api/cars endpoints', () => {
  const sampleCar = {
    id: 1,
    year: 2020,
    make: 'Toyota',
    model: 'Corolla',
    series: 'LE',
    mileage: 10000,
    location_city: 'Paris',
    location_branch: 'Centre',
    sale_price: 15000.0,
    stock_number: 'STK123',
    vin: 'VIN123456789',
    transmission: 'Automatique',
    fuel_type: 'Essence',
    cylinders: 4,
    photos: ['https://picsum.photos/200/100'],
  };

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('GET /api/cars returns list of cars', async () => {
    jest.spyOn(carModel, 'getAllCars').mockResolvedValue([sampleCar]);
    const res = await request(app).get('/api/cars');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([sampleCar]);
  });

  test('GET /api/cars/:id returns car details', async () => {
    jest.spyOn(carModel, 'getCarById').mockResolvedValue(sampleCar);
    const res = await request(app).get('/api/cars/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(sampleCar);
  });

  test('GET /api/cars/:id with invalid id returns 400', async () => {
    const res = await request(app).get('/api/cars/abc');
    expect(res.status).toBe(400);
  });

  test('GET /api/cars/:id not found returns 404', async () => {
    jest.spyOn(carModel, 'getCarById').mockResolvedValue(null);
    const res = await request(app).get('/api/cars/999');
    expect(res.status).toBe(404);
  });

  test('POST /api/cars creates new car', async () => {
    jest.spyOn(carModel, 'createCar').mockResolvedValue(sampleCar);
    const carData = { ...sampleCar };
    delete carData.id;

    const res = await request(app).post('/api/cars').send(carData);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(sampleCar);
  });

  test('PUT /api/cars/:id updates car', async () => {
    jest.spyOn(carModel, 'updateCar').mockResolvedValue(sampleCar);
    const carData = { ...sampleCar };
    delete carData.id;

    const res = await request(app).put('/api/cars/1').send(carData);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(sampleCar);
  });

  test('PUT /api/cars/:id not found returns 404', async () => {
    jest.spyOn(carModel, 'updateCar').mockResolvedValue(null);
    const carData = { ...sampleCar };
    delete carData.id;

    const res = await request(app).put('/api/cars/999').send(carData);
    expect(res.status).toBe(404);
  });

  test('DELETE /api/cars/:id deletes car', async () => {
    jest.spyOn(carModel, 'deleteCar').mockResolvedValue(true);
    const res = await request(app).delete('/api/cars/1');
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/supprimée/i);
  });

  test('DELETE /api/cars/:id not found returns 404', async () => {
    jest.spyOn(carModel, 'deleteCar').mockResolvedValue(false);
    const res = await request(app).delete('/api/cars/999');
    expect(res.status).toBe(404);
  });
});
