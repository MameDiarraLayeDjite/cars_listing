import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { pool } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigration() {
  let connection;
  try {
    // Lire le fichier de migration
    const migrationPath = join(__dirname, 'migrations', '001_create_cars_table.sql');
    const sql = await readFile(migrationPath, 'utf8');
    
    // Exécuter la migration
    connection = await pool.getConnection();
    console.log('Exécution de la migration...');
    await connection.query(sql);
    console.log('Migration exécutée avec succès !');
    
    // Vérifier que la table a été créée
    const [tables] = await connection.query("SHOW TABLES LIKE 'cars'");
    if (tables.length === 0) {
      throw new Error('La table cars n\'a pas été créée');
    }
    console.log('La table cars a été créée avec succès');
    
    // Afficher la structure de la table
    const [columns] = await connection.query('DESCRIBE cars');
    console.log('\nStructure de la table cars :');
    console.table(columns);
    
  } catch (error) {
    console.error('Erreur lors de l\'exécution de la migration:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.release();
      await pool.end();
    }
    process.exit(0);
  }
}

runMigration();
