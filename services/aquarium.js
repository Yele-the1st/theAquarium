const axios = require("axios");

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
    let fromCache = false;
    try {
      results = await fetchApiData(species);
      if (results.length === 0) {
        const error = new Error("API returned an empty array");
        error.statusCode = 404;
        throw error;
      }
      return { results, fromCache };
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 404;
        error.message = "Data unavailable";
      }
      next(error);
    }
  },
};
