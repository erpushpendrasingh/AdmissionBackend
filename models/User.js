const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
     firstname: {
          type: String,
          // required: true,
     },
     lastname: {
          type: String,
        
     },
     father_name: {
          type: String,
        
     },
     mother_name: {
          type: String,
        
     },
     mobile_num: {
          type: String,
        
     },
     dob: {
          type: String,
        
     },
    
     mail_id: {
          type: String,
        
     },
     password: {
          type: String,
        
     },
     city: {
          type: String,
        
     },
     state: {
          type: String,
        
     },
     exam_attempted: {
          type: String,
        
     },
    
     
});

const UserModel = mongoose.model("user", userSchema);
module.exports = {
    UserModel,
};


// {
//      "firstname": "John",
//      "lastname": "Doe",
//      "father_name": "Michael Doe",
//      "mother_name": "Emily Doe",
//      "mobile_num": "1234567890",
//      "dob": "1995-05-15",
//      "mail_id": "john.doe@example.com",
//      "password": "password123",
//      "city": "New York",
//      "state": "NY",
//      "exam_attempted": "SAT"
//  },
//  {
//      "firstname": "Alice",
//      "lastname": "Smith",
//      "father_name": "Robert Smith",
//      "mother_name": "Jennifer Smith",
//      "mobile_num": "9876543210",
//      "dob": "1998-08-25",
//      "mail_id": "alice.smith@example.com",
//      "password": "securepass",
//      "city": "Los Angeles",
//      "state": "CA",
//      "exam_attempted": "ACT"
//  },