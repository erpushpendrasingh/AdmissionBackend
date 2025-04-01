const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: String,
  courses:String,
  state: String,
  location:String,
  fees:String,

  logoUrl: String,
  
}, { collection: 'universities' });

module.exports = mongoose.model('University', universitySchema);
