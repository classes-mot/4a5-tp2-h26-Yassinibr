import express from 'express';
import {
  getJeux,
  getJeu,
  addJeu,
  updateJeu,
  deleteJeu,
} from '../controllers/jeu-controller.js';
import verifierToken from '../middleware/auth-middleware.js';

const jeuRouter = express.Router();

jeuRouter.get('/', getJeux);
jeuRouter.get('/:id', getJeu);

jeuRouter.post('/', verifierToken, addJeu);
jeuRouter.patch('/:id', verifierToken, updateJeu);
jeuRouter.delete('/:id', verifierToken, deleteJeu);

export default jeuRouter;