import { pool, query } from '../db.js';

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

  if (filters.location) {
    const likeLocation = `%${filters.location.toLowerCase()}%`;
    conditions.push(`(LOWER(location_city) LIKE ? OR LOWER(location_branch) LIKE ?)`);
    params.push(likeLocation, likeLocation);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  return { whereClause, params };
}

export async function getAllCars(filters = {}, showInactive = false, page = 1, limit = 10) {
  console.log('\n=== getAllCars called ===');
  console.log('Filters:', JSON.stringify(filters, null, 2));
  console.log('showInactive:', showInactive);
  console.log('Page:', page, 'Limit:', limit);

  const connection = await pool.getConnection();
  console.log('Database connection acquired');

  try {
    await connection.beginTransaction();
    console.log('Transaction started');

    // Construire la clause WHERE
    const { whereClause, params } = buildFilterQuery(filters);
    console.log('\nBuilt whereClause:', whereClause);
    console.log('Built params:', params);

    const conditions = [];
    const queryParams = [...params];

    // Extract conditions without the WHERE keyword
    if (whereClause) {
      // Remove 'WHERE ' prefix if it exists
      const conditionOnly = whereClause.replace(/^WHERE\s+/i, '');
      conditions.push(conditionOnly);
    }

    if (!showInactive) {
      conditions.push('status = ?');
      queryParams.push('actif');
      console.log('Added status filter: status = actif');
    }

    // Construire la clause WHERE finale en combinant toutes les conditions
    const finalWhereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    console.log('\nFinal WHERE clause:', finalWhereClause);
    console.log('Query params:', queryParams);

    // Requête pour compter le nombre total d'éléments
    const countSql = `
      SELECT COUNT(*) as total 
      FROM cars
      ${finalWhereClause}
    `;

    console.log('\n=== Count Query ===');
    console.log('SQL:', countSql);
    console.log('Params:', queryParams);

    const [countResults] = await connection.query(countSql, queryParams);
    console.log('Count query results:', countResults);

    const total = countResults[0]?.total || 0;
    console.log('Total records:', total);
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    console.log('Pagination - Offset:', offset, 'Limit:', limit);

    // Requête pour récupérer les données paginées
    const dataSql = `
      SELECT id, year, make, model, series, mileage, 
             location_city, location_branch,
             sale_price, stock_number, 
             vin, transmission, fuel_type, cylinders, status, photos
      FROM cars
      ${finalWhereClause}
      ORDER BY id DESC
      LIMIT ? OFFSET ?
    `;

    // Ajouter les paramètres de pagination
    const paginationParams = [...queryParams, limit, offset];

    console.log('\n=== Data Query ===');
    console.log('SQL:', dataSql);
    console.log('Params:', paginationParams);

    const [cars] = await connection.query(dataSql, paginationParams);
    console.log('Query successful, returned', cars.length, 'cars');
    console.log('First car sample:', cars[0] ? '...' : 'No results');

    // Formater les résultats
    console.log('\n=== Formatting Results ===');
    const formattedCars = cars.map(car => {
      try {
        const formatted = {
          ...car,
          price: car.sale_price,
          fuelType: car.fuel_type,
          photos: typeof car.photos === 'string' ? JSON.parse(car.photos || '[]') : (car.photos || []),
        };
        return formatted;
      } catch (error) {
        console.error('Error formatting car:', car.id, error);
        return null;
      }
    }).filter(Boolean);

    console.log(`Formatted ${formattedCars.length} cars successfully`);

    await connection.commit();
    console.log('Transaction committed');

    const result = {
      data: formattedCars,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        limit
      }
    };

    console.log('\n=== Returning Results ===');
    console.log(`Returning ${formattedCars.length} cars out of ${total} total`);
    return result;
  } catch (error) {
    console.error('\n=== ERROR in getAllCars ===');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('SQL State:', error.sqlState);
    console.error('SQL Message:', error.sqlMessage);
    console.error('Stack:', error.stack);

    if (error.sql) {
      console.error('Problematic SQL:', error.sql);
    }

    // Créer une erreur plus détaillée
    const dbError = new Error('Database query failed');
    dbError.code = error.code || 'DB_ERROR';
    dbError.sqlMessage = error.sqlMessage;
    dbError.sqlState = error.sqlState;
    dbError.originalError = error;

    if (connection) {
      try {
        await connection.rollback();
        console.log('Transaction rolled back');
      } catch (rollbackError) {
        console.error('Error during rollback:', rollbackError);
      }
    }

    throw dbError;
  } finally {
    if (connection) {
      try {
        console.log('Releasing database connection');
        await connection.release();
      } catch (releaseError) {
        console.error('Error releasing connection:', releaseError);
      }
    }
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
      cylinders = ?, photos = ?, status = ?
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
    carData.status || 'actif', // Ajout du statut avec une valeur par défaut
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
