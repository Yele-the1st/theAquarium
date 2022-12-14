const axios = require("axios");
const redisClient = require("../util/redis_helper");

const fetchApiData = async (species) => {
  const apiResponse = await axios.get(
    `https://www.fishwatch.gov/api/species/${species}`
  );
  console.log("Request sent to the Api");
  return apiResponse.data;
};

module.exports = {
  getSpeciesData: async (req) => {
    const species = req.params.species;
    let results;
    try {
      results = await fetchApiData(species);
      if (results.length === 0) {
        const error = new Error("API returned an empty array");
        error.statusCode = 404;
        throw error;
      }
      await redisClient.set(species, JSON.stringify(results), {
        EX: 180,
        NX: true,
      });

      return { results, isCached };
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 404;
        error.message = "Data unavailable";
      }
      next(error);
    }
  },
};
