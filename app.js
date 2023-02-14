const express = require("express"); // Importer Express

const app = express(); // Pour créer une application Express

app.use(express.json()); //Ce middleware intercept toutes les requêtes qui ont un content Type JSON

//Headrs allow our API to work on deferent servers
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
  console.log(req.body); // on a accesser au req.body grace express.json()
  res.status(201).json({
    //message: "Objet est bien Crée"
    resData: req.body
  }); //Pour la creation de ressource le code est 201 + si on n'envoie pas de res l'app va planter
});

//la route(End Point)
app.get("/api/stuff", (req, res, next) => {
  //Les données
  const stuff = [
    {
      _id: "oeihfzeoi",
      title: "Mon premier objet",
      description: "Les infos de mon premier objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 4900,
      userId: "qsomihvqios"
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 2900,
      userId: "qsomihvqios"
    }
  ];
  res.status(200).json(stuff); // Nous envoyons ensuite ces articles sous la forme de données JSON, avec un code 200 pour une demande réussie.
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
