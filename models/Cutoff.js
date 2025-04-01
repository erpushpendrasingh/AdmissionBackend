const mongoose = require('mongoose');

const cutoffSchema = new mongoose.Schema({
  cutoffRows: [
    {
      seattype: {
        type: String,
        required: true,
      },
      counsellingtype: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      subcategory: {
        type: String,
        required: true,
      },
      domicilecondition: {
        type: String,
        required: true,
      },
      round1rank2022: {
        type: Number,
        required: true,
      },
      round2rank2022: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Cutoff', cutoffSchema);
