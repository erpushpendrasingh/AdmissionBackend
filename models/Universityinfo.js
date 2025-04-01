const mongoose=require('mongoose')

const UniversityinfoSchema=new mongoose.Schema({
    State:String,
    City:String,
    AffiliatedBy:String,
    CollegeCategory:String
})

const Universityinfo=mongoose.model('Universityinfo',UniversityinfoSchema)
module.exports=Universityinfo