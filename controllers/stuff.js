const Thing = require("../models/Thing");

//ADD
exports.createThing = (req, res, next) => {
  //delete req.body.userId; // Pour supprimer un attr depuis notre objet
  //Creera un nouvel objet thing avec l'id qui sera generer automatiquement
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
};

//PUT/UPDATE
exports.modifyThing = (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ resData: req.body }))
    .catch(error => res.status(400).json({ error }));
};

//DELETE
exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Bien Supprimé !" }))
    .catch(error => res.status(400).json({ error }));
};

//ONE THING
exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(400).json({ error })); // si aucun Thing n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée
};

//ALL THINGS
exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
};
