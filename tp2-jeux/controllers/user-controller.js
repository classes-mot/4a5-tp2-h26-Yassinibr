import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user-model.js';

const JWT_SECRET = 'monSecretSuperSecret123';

// POST inscription
const inscription = async (req, res, next) => {
  try {
    const { nom, email, motDePasse } = req.body;

    const userExistant = await User.findOne({ email });
    if (userExistant) {
      const error = new Error('Cet email est déjà utilisé');
      error.code = 400;
      return next(error);
    }

    const user = new User({ nom, email, motDePasse });
    const userSauvegarde = await user.save();

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: {
        _id: userSauvegarde._id,
        nom: userSauvegarde.nom,
        email: userSauvegarde.email,
      },
    });
  } catch (erreur) {
    console.log(erreur); // 👈 ajoute cette ligne
    const error = new Error("Erreur lors de l'inscription");
    error.code = 500;
    return next(error);
  }
};

// POST connexion
const connexion = async (req, res, next) => {
  try {
    const { email, motDePasse } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('Email ou mot de passe invalide');
      error.code = 401;
      return next(error);
    }

    const motDePasseValide = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!motDePasseValide) {
      const error = new Error('Email ou mot de passe invalide');
      error.code = 401;
      return next(error);
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        _id: user._id,
        nom: user.nom,
        email: user.email,
      },
    });
  } catch (erreur) {
    const error = new Error('Erreur lors de la connexion');
    error.code = 500;
    return next(error);
  }
};

export { inscription, connexion };