const express = require("express");
const router = express.Router();

const stuffCtrl = require("../controllers/stuff");

router.get("/", stuffCtrl.getAllThings); //GET ALL
router.get("/:id", stuffCtrl.getOneThing); //GET ONE
router.post("/", stuffCtrl.createThing); //ADD
router.put("/:id", stuffCtrl.modifyThing); //PUT/UPDATE
router.delete("/:id", stuffCtrl.deleteThing); //DELETE

module.exports = router;
