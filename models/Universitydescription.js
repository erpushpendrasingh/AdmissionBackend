const mongoose = require("mongoose");

const universityschema = new mongoose.Schema({
  name: String,
  collegetype: String,
  location: String,
  established: String,
  address: String,
  description: String,
});

const Universitydes = mongoose.model("Universitydes", universityschema);
module.exports = Universitydes;
