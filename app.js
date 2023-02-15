const express = require("express"); // Importer Express
const mongoose = require("mongoose");

const Thing = require("./models/Thing");

const app = express(); // Pour créer une application Express

mongoose
  .connect(
    "mongodb+srv://mehdi_1990:mehdi_1990@cluster0.85jqavd.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json()); //Ce middleware intercept toutes les requêtes qui ont un content Type JSON

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

//Middleware ADD
app.post("/api/stuff", (req, res, next) => {
  //delete req.body.userId; // Pour supprimer un attr depuis notre objet
  const thing = new Thing({
    ...req.body // L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
  });

  thing
    .save() // pour enregistrer votre Thing dans la base de données.
    .then(() =>
      res.status(201).json({
        resData: thing
      })
    )
    .catch(error => res.status(400).json({ error }));
});

//Middleware Git ALL
//nous utilisons la méthode get() pour répondre uniquement aux demandes GET à cet endpoint ;
app.get("/api/stuff", (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

//Middleware Git One
app.get("/api/stuff/:id", (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(400).json({ error })); // si aucun Thing n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée
});

module.exports = app; // export app pour puisse l'acceeder dans notre application
