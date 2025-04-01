const mongoose = require("mongoose");

const combinedDataSchema = new mongoose.Schema({
  universityDescription: {
    type: String,
    required: true,
  },
  collegename: {
    type: String,
    required: true,
  },
  established: {
    type: String,
    required: true,
  },
  collegetype: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  approval: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  affiliatedby: {
    type: String,
    required: true,
  },
  collegecategory: {
    type: String,
    required: true,
  },
  courses: [
    {
      course: String,
      branch: String,
      totalSeat: String,
      courseDuration: String,
      tuitionFee: String,
    },
  ],
  cutoffdata: [
    {
      seattype: String,
      counsellingtype: String,
      category: String,
      domicilecondition: String,
      round1rank2022: String,
      round2rank2022: String,
    },
  ],

  website: {
    type: String,
  },

  mail: {
    type: String, // Store the
  },
  image1: {
    type: String,
  },

  image2: {
    type: String, // Store the image path
  },
});

module.exports = mongoose.model("CombinedData", combinedDataSchema);
