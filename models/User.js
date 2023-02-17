const mongosse = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userShema = mongosse.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userShema.plugin(uniqueValidator); // Avec cette methode on aura pas plusieur users avec la meme adresse mail

module.exports = mongosse.model("User", userShema);
