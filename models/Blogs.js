const mongoose=require('mongoose')
const BlogSchema = new mongoose.Schema({

    title:String,
    description:String,
    date : String,
    image:String

   
  



  
    
    
  }, { collection: 'Blog' });
  
  module.exports = mongoose.model('Blog', BlogSchema);