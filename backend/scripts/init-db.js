import { pool } from '../db.js';

async function initDatabase() {
  let connection;
  try {
    connection = await pool.getConnection();
    
    // Vérifier si la table cars existe
    const [tables] = await connection.query(
      "SHOW TABLES LIKE 'cars'"
    );

    if (tables.length === 0) {
      console.log('La table cars n\'existe pas. Création en cours...');
      
      // Créer la table cars
      await connection.query(`
        CREATE TABLE IF NOT EXISTS cars (
          id INT AUTO_INCREMENT PRIMARY KEY,
          year INT NOT NULL,
          make VARCHAR(100) NOT NULL,
          model VARCHAR(100) NOT NULL,
          series VARCHAR(100) NOT NULL,
          mileage INT NOT NULL,
          location_city VARCHAR(100) NOT NULL,
          location_branch VARCHAR(100) NOT NULL,
          sale_price DECIMAL(10, 2) NOT NULL,
          stock_number VARCHAR(50) NOT NULL UNIQUE,
          vin VARCHAR(17) NOT NULL UNIQUE,
          transmission VARCHAR(50) NOT NULL,
          fuel_type VARCHAR(50) NOT NULL,
          cylinders INT NOT NULL,
          photos JSON,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);
      
      console.log('La table cars a été créée avec succès.');
      
      // Insérer des données de test (optionnel)
      await connection.query(`
        INSERT INTO cars 
        (year, make, model, series, mileage, location_city, location_branch, sale_price, stock_number, vin, transmission, fuel_type, cylinders, photos) 
        VALUES 
        (2022, 'Toyota', 'Corolla', 'SE', 15000, 'Montreal', 'Downtown', 24999.99, 'TOY-001', 'JT2BF22K3W0123456', 'Automatic', 'Gasoline', 4, '[]'),
        (2021, 'Honda', 'Civic', 'EX', 20000, 'Quebec', 'Old Port', 22999.99, 'HON-001', '2HGFC2F56LH543210', 'CVT', 'Gasoline', 4, '[]');
      `);
      
      console.log('Données de test insérées avec succès.');
    } else {
      console.log('La table cars existe déjà.');
    }
    
    // Afficher la structure de la table
    const [columns] = await connection.query('DESCRIBE cars');
    console.log('\nStructure de la table cars :');
    console.table(columns);
    
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
  } finally {
    if (connection) {
      await connection.release();
      await pool.end();
    }
  }
}

initDatabase().then(() => process.exit(0));
