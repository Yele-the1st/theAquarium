require("dotenv").config();
const express = require("express");
const redisClient = require("./util/redis_helper");

const app = express();
const aquariumRoutes = require("./routes/aquarium");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/fish", aquariumRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

const redis_init = async () => {
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient
    .connect()
    .then((result) => {
      console.log("Redis server Connected")
    })
    .catch((err) => {
      console.log("Redis initialization failed:", err)
    });
};

redis_init();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
