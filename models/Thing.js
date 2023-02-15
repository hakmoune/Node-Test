const mongoose = require("mongoose");

//nous créons un schéma de données qui contient les champs souhaités pour chaque Thing
//Pour cela, on utilise la méthode Schema mise à disposition par Mongoose
//Pas besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose
const thingShema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  //userId: { type: String, required: true },
  price: { type: Number, required: true }
});

//ensuite, nous exportons ce schéma en tant que modèle Mongoose appelé « Thing »,
//le rendant par là même disponible pour notre application Express.
module.exports = mongoose.model("Thing", thingShema);
