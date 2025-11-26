import { query } from '../db.js';

export async function findUserByUsername(username) {
  if (!username) return null;
  const sql = 'SELECT id, username, password_hash FROM users WHERE username = ? LIMIT 1';
  const rows = await query(sql, [username]);
  return rows.length > 0 ? rows[0] : null;
}

export async function createUser(userData) {
  const { username, password_hash } = userData;
  if (!username || !password_hash) {
    throw new Error('username and password_hash are required');
  }
  const sql = 'INSERT INTO users (username, password_hash) VALUES (?, ?)';
  const result = await query(sql, [username, password_hash]);
  return { id: result.insertId, username };
}
