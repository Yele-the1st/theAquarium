const redisClient = require("../util/redis_helper");

module.exports = async (req, res, next) => {
  const species = req.params.species;
  let results;
  try {
    const cacheResults = await redisClient.get(species);
    if (cacheResults) {
      results = JSON.parse(cacheResults);
      res.send({
        fromCache: true,
        data: results,
      });
    } else {
      next();
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 404;
      error.message = "Data unavailable";
    }
    next(error);
  }
};
