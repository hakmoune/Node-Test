const express = require("express"); // Importer Express

const app = express(); // Creer un application Express

//un middleware
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
});

module.exports = app; // export app pour puisse l'acceeder dans notre application
