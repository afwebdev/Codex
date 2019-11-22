// Requiring necessary npm packages
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./server/config");
const userRoute = require("./server/routes/user");
const authRoute = require("./server/routes/auth");
const questionRoute = require("./server/routes/questions");
const answerRoute = require("./server/routes/answer");
const commentRoute = require("./server/routes/comment");

//Init the Connection to the DB.
require("./server/config/dbConnection");

// Creating express app and configuring middleware needed for authentication
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Static Folder (public) for client to reach assets.
app.use(express.static("client/build"));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ":" + err.message });
  }
});

// Requiring our API routes
app.use("/", userRoute);
app.use("/", authRoute);
app.use("/", questionRoute);
app.use("/", answerRoute);
app.use("/", commentRoute);
// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//Start up the server!
app.listen(config.port, () => {
  console.log(`Server Started at port ${config.port}`);
});
