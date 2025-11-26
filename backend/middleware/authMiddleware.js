import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token d\'authentification manquant' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token d\'authentification manquant' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token invalide ou expiré' });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Erreur d\'authentification' });
  }
}
