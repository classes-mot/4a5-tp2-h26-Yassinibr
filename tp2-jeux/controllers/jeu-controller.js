import { Jeu } from '../models/jeu-model.js';

const getJeux = async (req, res, next) => {
  try {
    const jeux = await Jeu.find();
    res.json(jeux);
  } catch (erreur) {
    const error = new Error('Erreur lors de la récupération des jeux');
    error.code = 500;
    return next(error);
  }
};

const getJeu = async (req, res, next) => {
  try {
    const jeu = await Jeu.findById(req.params.id);
    if (!jeu) {
      const error = new Error('Jeu non trouvé');
      error.code = 404;
      return next(error);
    }
    res.json(jeu);
  } catch (erreur) {
    const error = new Error('Erreur lors de la récupération du jeu');
    error.code = 500;
    return next(error);
  }
};

const addJeu = async (req, res, next) => {
  try {
    const jeu = new Jeu(req.body);
    const jeuSauvegarde = await jeu.save();
    res.status(201).json(jeuSauvegarde);
  } catch (erreur) {
    const error = new Error('Erreur lors de la création du jeu');
    error.code = 500;
    return next(error);
  }
};

const updateJeu = async (req, res, next) => {
  try {
    const jeu = await Jeu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!jeu) {
      const error = new Error('Jeu non trouvé');
      error.code = 404;
      return next(error);
    }
    res.json(jeu);
  } catch (erreur) {
    const error = new Error('Erreur lors de la mise à jour du jeu');
    error.code = 500;
    return next(error);
  }
};

const deleteJeu = async (req, res, next) => {
  try {
    const jeu = await Jeu.findByIdAndDelete(req.params.id);
    if (!jeu) {
      const error = new Error('Jeu non trouvé');
      error.code = 404;
      return next(error);
    }
    res.json({ message: 'Jeu supprimé avec succès' });
  } catch (erreur) {
    const error = new Error('Erreur lors de la suppression du jeu');
    error.code = 500;
    return next(error);
  }
};

export { getJeux, getJeu, addJeu, updateJeu, deleteJeu };