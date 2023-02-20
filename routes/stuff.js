const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const stuffCtrl = require("../controllers/stuff");

router.get("/", auth, stuffCtrl.getAllThings); //GET ALL
router.post("/", auth, stuffCtrl.createThing); //ADD
router.get("/:id", auth, stuffCtrl.getOneThing); //GET ONE
router.put("/:id", auth, stuffCtrl.modifyThing); //PUT/UPDATE
router.delete("/:id", auth, stuffCtrl.deleteThing); //DELETE

module.exports = router;
