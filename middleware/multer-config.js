const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png"
};

//Creation d'un objet de configuration de Multer
//diskStorage()  configure le chemin et le nom de fichier pour les fichiers entrants.
const storage = multer.diskStorage({
  //1. Une fonction qui va expliquer a Multer ou on va sauvgarder les fichiers entrants
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  //2. Qu'il nom de fichier utiliser
  filename: (req, file, callback) => {
    // Éliminer le problème d'espace, si le nom original de fichier contient des espaces
    const name = file.originalname.split(" ").join("_");
    const extention = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extention);
  }
});
// Nous exportons ensuite l'élément multer entièrement configuré,
// Lui passons notre constante storage
// Et lui indiquons que nous gérerons uniquement les téléchargements de fichiers image (Single).
module.exports = multer({ storage }).single("image");
