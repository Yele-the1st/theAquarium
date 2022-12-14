const express = require("express");

const cacheData = require("../middleware/redis_cache")

const aquariumController = require("../controllers/aquarium");

const router = express.Router();

router.get("/:species", cacheData, aquariumController.getSpeciesData);


module.exports = router;