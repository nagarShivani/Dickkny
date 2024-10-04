require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("./src/config/db");
const routes = require("./src/routes/routes");


const app = express();

app.use(express.json());
app.use("*", cors());
app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "application is running..",
  });
});
app.use("/", routes);

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});
