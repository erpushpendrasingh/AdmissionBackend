const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  totalSeat: {
    type: Number,
    required: true,
  },
  courseDuration: {
    type: String,
    required: true,
  },
  tuitionFee: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Course', courseSchema);
