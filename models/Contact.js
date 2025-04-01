const mongoose = require("mongoose")

const contactScheme = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    description:{
        type:String
    }
})

const contactModel = mongoose.model("admissioncontact",contactScheme)

module.exports = {
    contactModel
}