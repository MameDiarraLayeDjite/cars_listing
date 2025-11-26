export function errorHandler(err, req, res, next) {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erreur serveur interne';

  res.status(statusCode).json({
    message,
  });
}
