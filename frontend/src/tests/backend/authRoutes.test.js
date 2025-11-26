import request from 'supertest';
import app from '../../backend/app.js';
import * as userModel from '../../backend/models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

describe('/api/auth login endpoint', () => {
  const username = 'admin';
  const password = 'password123';
  const passwordHash = bcrypt.hashSync(password, 10);
  const user = { id: 1, username, password_hash: passwordHash };

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('Login with correct credentials returns JWT token', async () => {
    jest.spyOn(userModel, 'findUserByUsername').mockResolvedValue(user);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username, password });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    const decoded = jwt.decode(res.body.token);
    expect(decoded.username).toBe(username);
  });

  test('Login with incorrect password returns 401', async () => {
    jest.spyOn(userModel, 'findUserByUsername').mockResolvedValue(user);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username, password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/incorrect/i);
  });

  test('Login with non-existing user returns 401', async () => {
    jest.spyOn(userModel, 'findUserByUsername').mockResolvedValue(null);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username, password });

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/incorrect/i);
  });

  test('Login with missing fields returns 400', async () => {
    const res = await request(app).post('/api/auth/login').send({ username: '' });
    expect(res.status).toBe(400);
  });
});
