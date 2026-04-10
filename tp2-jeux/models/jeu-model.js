import mongoose from "mongoose";

const jeuSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "Le nom est obligatoire"],
    },
    description: {
      type: String,
      required: [true, "La description est obligatoire"],
    },
    nombreJoueurs: {
      type: Number,
      required: [true, "Le nombre de joueurs est obligatoire"],
      min: [1, "Il faut au moins 1 joueur"],
    },
    dureePartie: {
      type: Number,
      required: false,
    },
    categorie: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Jeu = mongoose.model("Jeu", jeuSchema);

export { Jeu };