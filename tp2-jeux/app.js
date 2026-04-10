import express from 'express';
import jeuRoutes from './routes/jeu-Routes.js';
import userRoutes from './routes/user-Routes.js';
import errorHandler from './handler/error-handler.js';
import { connectDB } from './util/bd.js';

await connectDB();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/jeux', jeuRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  const error = new Error('Route non trouvée');
  error.code = 404;
  next(error);
});

app.use(errorHandler);

app.listen(5000, () => {
  console.log('Serveur écoute au', `http://localhost:5000`);
});