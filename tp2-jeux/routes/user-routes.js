import express from 'express';
import { inscription, connexion } from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.post('/inscription', inscription);
userRouter.post('/connexion', connexion);

export default userRouter;