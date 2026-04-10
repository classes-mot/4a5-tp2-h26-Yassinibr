import jwt from 'jsonwebtoken';

const JWT_SECRET = 'monSecretSuperSecret123';

const verifierToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      const error = new Error('Accès refusé, token manquant');
      error.code = 401;
      return next(error);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      const error = new Error('Accès refusé, token invalide');
      error.code = 401;
      return next(error);
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();

  } catch (erreur) {
    const error = new Error('Token invalide ou expiré');
    error.code = 401;
    return next(error);
  }
};

export default verifierToken;