const express = require("express"); // Importer Express
const mongoose = require("mongoose"); // Import mongoose

const app = express(); // Pour créer une application Express

const stuffRoutes = require("./routes/stuff"); //Importer notre stuff's routes
const userRoutes = require("./routes/user"); //Importer notre User's routes

//Etablir la cnx avec notre DB
mongoose
  .connect(
    "mongodb+srv://mehdi_1990:mehdi_1990@cluster0.85jqavd.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//Headrs allow our API to work on deferent servers (Surpase CROS error)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // * = d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); // d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
  next();
});

app.use(express.json()); //Ce middleware intercept toutes les requêtes qui ont un content Type JSON

app.use("/api/stuff", stuffRoutes); // Enregistrer nos routeurs stuff dans notre application Express
app.use("/api/auth", userRoutes); // Enregistrer nos routeurs user dans notre application Express

module.exports = app; // export app pour puisse l'acceeder dans notre application
