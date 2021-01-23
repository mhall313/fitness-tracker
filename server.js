// Dependancies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();

// Port setup
const PORT = process.env.PORT || 8000;

// Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Makes the public folder accessible
app.use(express.static("public"));

// Connection to mongoose
mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// Routes
app.use(require("./routes/html-routes.js"));
app.use(require("./routes/api-routes.js"));

//Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});