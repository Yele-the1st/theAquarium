const aquariumServices = require("../services/aquarium");

exports.getSpeciesData = async (req, res, next) => {
  try {
    const results = await aquariumServices.getSpeciesData(req);
    return res.status(200).json({
      message: "retrieved data successfully",
      fromCached: false,
      data: results.results,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 404;
    }
    next(err);
  }
};
