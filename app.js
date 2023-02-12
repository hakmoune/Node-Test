const express = require("express"); // Importer Express

const app = express(); // Creer un application Express

//un middleware
app.use((req, res) => {
  res.json({ message: "votre requite est bien" });
});

module.exports = app; // export app pour puisse l'acceeder dans notre application
