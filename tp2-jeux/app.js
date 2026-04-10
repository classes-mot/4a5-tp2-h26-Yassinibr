import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

// Connexion MongoDB
mongoose.connect("mongodb://localhost:27017/tp2_jeux")
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error("Erreur MongoDB :", err));

const port = 5000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

export default app;