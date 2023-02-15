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

//Middleware
app.post("/api/stuff", (req, res, next) => {
  //delete req.body.userId; // Pour supprimer un attr depuis notre objet
  const thing = new Thing({
    ...req.body // L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
  });

  thing
    .save() // pour enregistrer votre Thing dans la base de données.
    .then(() =>
      res.status(201).json({
        resData: req.body
      })
    )
    .catch(error => res.status(400).json({ error }));
});

//la route(End Point)
app.get("/api/stuff", (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app; // export app pour puisse l'acceeder dans notre application

/*un middleware
app.use((req, res, next) => {
  console.log("Requite Recue!!");
  next();
});
app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: "votre requite est bien" });
  next();
});

app.use((req, res) => {
  console.log("La reponse a été envoyer avec success");
});*/
