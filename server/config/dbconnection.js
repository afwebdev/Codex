const mongoose = require("mongoose"); //import mongoose
const config = require("../config/index"); //import config, proc_env vars to be used on deployment.
const URI = config.mongoURI;

module.exports = () => {
  mongoose.connect(URI || "mongodb://localhost/codex", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true //Server Discovery/Monitor
  });

  // Connection successful!
  mongoose.connection.on("connected", () => {
    console.log("Connection to MongoDB Was Successful.");
  });

  // When connection throws an error
  mongoose.connection.on("error", err => {
    console.log("MongoDB Connection Failed.. Something Broke 🔨 " + err);
  });
};
