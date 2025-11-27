export function errorHandler(err, req, res, next) {
  console.error('Error handler:', err);
  
  // Définir les valeurs par défaut
  let statusCode = 500;
  let message = 'Erreur serveur interne';
  let details = null;

  // Gestion des erreurs de validation
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Erreur de validation';
    details = Object.values(err.errors).map(e => e.message);
  } 
  // Gestion des erreurs de base de données
  else if (err.code === 'ER_NO_SUCH_TABLE') {
    statusCode = 500;
    message = 'Erreur de base de données: Table non trouvée';
    details = err.sqlMessage;
  } 
  else if (err.code === 'ER_BAD_FIELD_ERROR') {
    statusCode = 500;
    message = 'Erreur de base de données: Champ inconnu';
    details = err.sqlMessage;
  }
  // Gestion des erreurs personnalisées
  else if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
    if (err.details) {
      details = err.details;
    }
  }

  // En mode développement, inclure la stack trace
  const response = { message };
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
    if (details) response.details = details;
    if (err.sql) response.sql = err.sql;
    if (err.sqlMessage) response.sqlMessage = err.sqlMessage;
  }

  res.status(statusCode).json(response);
}
