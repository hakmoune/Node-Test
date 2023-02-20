const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = (req, res, next) => {
  // Hash le mot de passe avec bcrypt
  bcrypt
    // 10 = C'est combien de fois on excute l'algorithm de hashage (10 tour)
    // Plus la valeur est élevée, Plus l'exécution de la fonction sera longue, et plus le hachage sera sécurisé.
    .hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });

      user
        .save()
        .then(() =>
          res
            .status(201)
            .json({ message: "User a été bien Crée: " + user.email })
        )
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error })); // 500 Error de serveur
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      // vérifier que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données
      if (user === null) {
        // 401 Unauthorized // Email est incorrect
        res.status(401).json({
          message: "Paire Identifiant/Mot de passe incorrecte"
        }); // Msg Flow afin de ne pas laisser quelqu’un vérifier si une autre personne est inscrite sur notre site
      } else {
        bcrypt
          .compare(req.body.password, user.password) // comparer password entré par l'utilisateur avec le hash enregistré dans DB
          .then(valide => {
            if (!valide) {
              //False // Password est incorrect
              res.status(401).json({
                message: "Paire Identifiant/Mot de passe incorrecte"
              });
            } else {
              res.status(200).json({
                userId: user._id,
                // la fonction sign de jsonwebtoken pour chiffrer un nouveau token.
                // Ce token contient l'ID de l'utilisateur en tant que payload (les données encodées dans le token)
                // ID est utilisé pour remplire le champ CreatedBy
                // On envoie ID pour la creation de nouveaux Objets, EX: Si je crée un objet avec un utilisateur, je ne peux pas le modifier vc un autre Utilisateur
                // Payload encodé contient ID pour vérifier que l'utilisateur connecté n'utilise pas le token de quelqu'un d'autre
                // Les tokens JWT sont encodés et non cryptés, et peuvent donc être décodés avec la clé secrète. "RANDOM_TOKEN_SECRET" (Utiliser pour le chiffrement et le déchiffrement du token)
                token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                  expiresIn: "24h"
                })
              });
            }
          })
          .catch(error => res.status(500).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));
};
