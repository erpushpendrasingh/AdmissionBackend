const express = require('express')
const router =express.Router();
const blogs=require('../../models/Blogs')


router.get('/blogs/:heading' , async(req,res)=>{
    try{
        const heading = req.params.heading.replace('%20', ' '); // Replace %20 with space
      console.log('Fetching universities for name:', heading); 
      const blog = await blogs.find({heading: { $regex: new RegExp(heading, 'i') }});
      console.log('Fetched data:', blog); // Add this line
      res.status(200).json(blog);



    }
    catch(error){
        console.error("error fetchind data" , error)
        res.status(500).json({ message: 'Internal server error' });

    }
})
module.exports=router;