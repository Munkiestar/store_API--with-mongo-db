// mongo connection

const mogoose = require("mongoose");

mogoose.connect("mongodb://localhost:27017/store_API", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mogoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => console.log("Database connected"));

module.exports = db;
