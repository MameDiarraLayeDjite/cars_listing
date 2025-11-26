import http from 'http';
import dotenv from 'dotenv';
import app from './app.js';
import { pool } from './db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, async () => {
  try {
    // Test DB connection on startup
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('Connexion à la base de données MySQL réussie.');
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    process.exit(1);
  }
  console.log(`Serveur démarré sur le port ${PORT}`);
});
