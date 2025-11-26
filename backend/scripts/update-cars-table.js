import { pool } from '../db.js';

async function updateCarsTable() {
  let connection;
  try {
    connection = await pool.getConnection();
    
    console.log('Vérification de la structure de la table cars...');
    
    // Vérifier si la table existe
    const [tables] = await connection.query("SHOW TABLES LIKE 'cars'");
    
    if (tables.length === 0) {
      console.log('La table cars n\'existe pas. Création en cours...');
      
      // Créer la table cars avec la structure attendue
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
      
      // Insérer des données de test
      await connection.query(`
        INSERT INTO cars 
        (year, make, model, series, mileage, location_city, location_branch, sale_price, stock_number, vin, transmission, fuel_type, cylinders, photos) 
        VALUES 
        (2022, 'Toyota', 'Corolla', 'SE', 15000, 'Montreal', 'Downtown', 24999.99, 'TOY-001', 'JT2BF22K3W0123456', 'Automatic', 'Gasoline', 4, '[]'),
        (2021, 'Honda', 'Civic', 'EX', 20000, 'Quebec', 'Old Port', 22999.99, 'HON-001', '2HGFC2F56LH543210', 'CVT', 'Gasoline', 4, '[]');
      `);
      
      console.log('Données de test insérées avec succès.');
    } else {
      console.log('La table cars existe déjà. Vérification de la structure...');
      
      // Vérifier si les colonnes nécessaires existent, sinon les ajouter
      const [columns] = await connection.query('DESCRIBE cars');
      const columnNames = columns.map(col => col.Field);
      
      const requiredColumns = [
        'year', 'make', 'model', 'series', 'mileage', 'location_city',
        'location_branch', 'sale_price', 'stock_number', 'vin', 'transmission',
        'fuel_type', 'cylinders', 'photos'
      ];
      
      for (const col of requiredColumns) {
        if (!columnNames.includes(col)) {
          console.log(`La colonne ${col} est manquante. Ajout en cours...`);
          
          // Déterminer le type de colonne approprié
          let columnType = 'VARCHAR(100)';
          if (col === 'year' || col === 'mileage' || col === 'cylinders') {
            columnType = 'INT';
          } else if (col === 'sale_price') {
            columnType = 'DECIMAL(10, 2)';
          } else if (col === 'photos') {
            columnType = 'JSON';
          } else if (col === 'vin') {
            columnType = 'VARCHAR(17)';
          } else if (col === 'stock_number') {
            columnType = 'VARCHAR(50)';
          }
          
          await connection.query(`ALTER TABLE cars ADD COLUMN ${col} ${columnType} ${col === 'stock_number' || col === 'vin' ? 'UNIQUE' : ''} ${col === 'make' || col === 'model' || col === 'series' || col === 'location_city' || col === 'location_branch' || col === 'transmission' || col === 'fuel_type' ? 'NOT NULL' : ''}`);
          console.log(`Colonne ${col} ajoutée avec succès.`);
        }
      }
      
      // Vérifier si les colonnes obsolètes existent
      const obsoleteColumns = columnNames.filter(col => !requiredColumns.includes(col) && !['id', 'created_at', 'updated_at'].includes(col));
      
      for (const col of obsoleteColumns) {
        console.log(`La colonne ${col} n'est plus utilisée. Suppression en cours...`);
        await connection.query(`ALTER TABLE cars DROP COLUMN ${col}`);
        console.log(`Colonne ${col} supprimée avec succès.`);
      }
    }
    
    // Afficher la structure finale de la table
    const [finalColumns] = await connection.query('DESCRIBE cars');
    console.log('\nStructure finale de la table cars :');
    console.table(finalColumns);
    
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la table cars:', error);
  } finally {
    if (connection) {
      await connection.release();
      await pool.end();
    }
  }
}

updateCarsTable().then(() => process.exit(0));
