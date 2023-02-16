const express = require("express");
const router = express.Router();

const Thing = require("../models/Thing");

//Middleware Git ALL
//nous utilisons la méthode get() pour répondre uniquement aux demandes GET à cet Endpoint/Route ;
router.get("/", (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

//Middleware Git One
router.get("/:id", (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(400).json({ error })); // si aucun Thing n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée
});

//Middleware ADD
router.post("/", (req, res, next) => {
  //delete req.body.userId; // Pour supprimer un attr depuis notre objet

  //Creera un nouvel objet thing avec l'id generer automatiquement
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

//Middleware PUT/Update
router.put("/:id", (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ resData: req.body }))
    .catch(error => res.status(400).json({ error }));
});

//Middleware Delete
router.delete("/:id", (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Bien Supprimé !" }))
    .catch(error => res.status(400).json({ error }));
});

module.exports = router;
