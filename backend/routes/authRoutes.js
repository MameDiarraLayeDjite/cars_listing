import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByUsername } from '../models/userModel.js';

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (
      !username ||
      typeof username !== 'string' ||
      !password ||
      typeof password !== 'string'
    ) {
      return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe requis' });
    }

    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }

    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });

    res.json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
