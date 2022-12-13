require("dotenv").config();
const express = require("express");

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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
