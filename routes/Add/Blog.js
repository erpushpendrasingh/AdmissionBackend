const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage(); // or use disk storage if you prefer
const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } });

const router = express.Router();
const Blog = require("../../models/Blogs");

router.post(
  "/uploadBlog",
  upload.fields([{ name: "image" }]),
  async (req, res) => {
    try {
      const { title, description, date, image } = req.body;

      console.log(req.body);

      const blog = new Blog({
        title,
        description,
        date,
        image,
      });
      await blog.save();
    } catch (error) {
      console.error("error", error);
    }
    res.json({ message: "Blog added successfully" });
  }
);

router.get("/get-all-blog", async (req, res) => {
  try {
    const blogs=await Blog.find()
    res.status(200).json({
      blogs:blogs
    })
  } catch (error) {
    res.status(500).json({
      message:"something went wrong"
    })
  }
});
router.get("/getBlog/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


module.exports = router;
