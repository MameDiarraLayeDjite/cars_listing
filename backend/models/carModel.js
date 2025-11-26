import { query } from '../db.js';

function buildFilterQuery(filters) {
  const conditions = [];
  const params = [];

  if (filters.name) {
    const likeName = `%${filters.name.toLowerCase()}%`;
    conditions.push(
      `(LOWER(CONCAT(year, ' ', make, ' ', model, ' ', series)) LIKE ?)`
    );
    params.push(likeName);
  }

  if (filters.vin) {
    conditions.push(`LOWER(vin) = ?`);
    params.push(filters.vin.toLowerCase());
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  return { whereClause, params };
}

export async function getAllCars(filters = {}) {
  try {
    const { whereClause, params } = buildFilterQuery(filters);
    const sql = `
      SELECT id, year, make, model, series, mileage, 
             location_city, location_branch,
             sale_price, stock_number, 
             vin, transmission, fuel_type, cylinders, photos
      FROM cars
      ${whereClause}
      ORDER BY id DESC
    `;

    console.log('Executing SQL:', sql);
    console.log('With params:', params);

    const cars = await query(sql, params);

    // Parse photos JSON and map sale_price to price
    return cars.map(car => ({
      ...car,
      price: car.sale_price, // Map sale_price to price for frontend compatibility
      fuelType: car.fuel_type, // Map fuel_type to fuelType for frontend compatibility
      photos: JSON.parse(car.photos || '[]'),
    }));
  } catch (error) {
    console.error('Error in getAllCars:', error);
    throw new Error(`Failed to fetch cars: ${error.message}`);
  }
}

export async function getCarById(id) {
  if (!id || isNaN(id)) {
    return null;
  }
  const sql = `
    SELECT id, year, make, model, series, mileage, location_city, location_branch,
           sale_price, stock_number, vin, transmission, fuel_type, cylinders, photos
    FROM cars
    WHERE id = ?
    LIMIT 1
  `;
  const rows = await query(sql, [id]);
  if (rows.length === 0) return null;
  const car = rows[0];
  return {
    ...car,
    price: car.sale_price, // Map sale_price to price for frontend compatibility
    fuelType: car.fuel_type, // Map fuel_type to fuelType for frontend compatibility
    photos: JSON.parse(car.photos || '[]'),
  };
}

export async function createCar(carData) {
  const {
    year,
    make,
    model,
    series,
    mileage,
    location_city,
    location_branch,
    sale_price,
    stock_number,
    vin,
    transmission,
    fuel_type,
    cylinders,
    photos,
  } = carData;

  const photosJson = JSON.stringify(photos || []);

  const sql = `
    INSERT INTO cars
      (year, make, model, series, mileage, location_city, location_branch,
       sale_price, stock_number, vin, transmission, fuel_type, cylinders, photos)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const result = await query(sql, [
    year,
    make,
    model,
    series,
    mileage,
    location_city,
    location_branch,
    sale_price,
    stock_number,
    vin,
    transmission,
    fuel_type,
    cylinders,
    photosJson,
  ]);

  return getCarById(result.insertId);
}

export async function updateCar(id, carData) {
  const {
    year,
    make,
    model,
    series,
    mileage,
    location_city,
    location_branch,
    sale_price,
    stock_number,
    vin,
    transmission,
    fuel_type,
    cylinders,
    photos,
  } = carData;

  const photosJson = JSON.stringify(photos || []);

  const sql = `
    UPDATE cars SET
      year = ?, make = ?, model = ?, series = ?, mileage = ?,
      location_city = ?, location_branch = ?, sale_price = ?,
      stock_number = ?, vin = ?, transmission = ?, fuel_type = ?,
      cylinders = ?, photos = ?
    WHERE id = ?
  `;

  const result = await query(sql, [
    year,
    make,
    model,
    series,
    mileage,
    location_city,
    location_branch,
    sale_price,
    stock_number,
    vin,
    transmission,
    fuel_type,
    cylinders,
    photosJson,
    id,
  ]);

  if (result.affectedRows === 0) {
    return null;
  }

  return getCarById(id);
}

export async function deleteCar(id) {
  if (!id || isNaN(id)) {
    return false;
  }
  const sql = 'DELETE FROM cars WHERE id = ?';
  const result = await query(sql, [id]);
  return result.affectedRows > 0;
}
