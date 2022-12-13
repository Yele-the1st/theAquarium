const express = require("express");

const aquariumController = require("../controllers/aquarium");

const router = express.Router();

router.get("/:species", aquariumController.getSpeciesData);


module.exports = router;