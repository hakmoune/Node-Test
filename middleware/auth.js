const jwt = require("jsonwebtoken");

//Nous allons à présent créer le middleware qui va vérifier que l’utilisateur est bien connecté
//et transmettre les informations de connexion aux différentes méthodes qui vont gérer les requêtes.
module.exports = (req, res, next) => {
  try {
    // Nous extrayons le token du "header Authorization" de la requête entrante
    // Request Headears envoyé par le front => Authorization: Bearer TOKEN
    //const token = req.headers.authorization.split(" ")[1];
    const token = req.headers.authorization;

    // verify pourdécoder le token. Si celui-ci n'est pas valide, une erreur sera générée.
    //La méthode verify() du package jsonwebtoken permet de vérifier la validité d'un token
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");

    // Nous extrayons l'ID utilisateur de notre token et le rajoutons à l’objet Request afin que nos différentes routes puissent l’exploiter.
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
