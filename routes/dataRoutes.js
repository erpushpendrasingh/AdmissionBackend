const express = require("express");
const router = express.Router();
const CombinedData = require("../models/Combinedata");
const multer = require("multer");

const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, "uploads1/");
 },

 filename: function (req, file, cb) {
  cb(null, Date.now() + file.originalname);
 },
});

const upload = multer({ storage: storage });

router.post(
 "/uploadData",
 upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
 ]),
 async (req, res) => {
  try {
   const {
    universityDescription,
    collegename,
    established,
    collegetype,
    location,
    approval,
    address,
    state,
    city,
    affiliatedby,
    collegecategory,
    courses,
    cutoffdata,
    website,
    mail,
    image1,
    image2,
   } = req.body;

   const combinedData = new CombinedData({
    universityDescription,
    collegename,
    established,
    collegetype,
    location,
    approval,
    address,
    state,
    city,
    affiliatedby,
    collegecategory,
    courses,
    cutoffdata,
    website,
    mail,
    image1,
    image2,
   });

   await combinedData.save();

   res.status(200).json({ message: "Data added successfully" });
  } catch (error) {
   console.error(error);
   res.status(500).json({ message: "Internal server error" });
  }
 }
);
router.get("/universities", async (req, res) => {
 try {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const universities = await CombinedData.find().skip(skip).limit(limit);
  const totalDocuments = await CombinedData.countDocuments();

  res.status(200).json({
   universities,
   totalPages: Math.ceil(totalDocuments / limit),
   currentPage: page,
  });
 } catch (error) {
  console.error("Error fetching universities:", error);
  res.status(500).json({ message: "Internal server error" });
 }
});
// router.get("/universities/:id", async (req, res) => {
//   try {
//     let id = req.params.id;
//     console.log("state:", state);
//     const universities = await CombinedData.findById({ id });
//     res.status(200).json(universities);
//   } catch (error) {
//     console.error("Error fetching universities:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// router.get("/universities/state/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const websiteData = await CombinedData.findById(id)
//       .select("collegename");
//     if (!websiteData) {
//       return res.status(404).json({ error: "No data found" });
//     }
//     res.json(websiteData);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.get("/universities/state/:id", async (req, res) => {
 try {
  const id = req.params.id;
  const websiteData = await CombinedData.findById(id);
  // .select("-image1 -image2 collegename address state city affiliatedby collegecategory");
  if (!websiteData) {
   return res.status(404).json({ error: "No data found" });
  }
  res.json(websiteData);
 } catch (error) {
  res.status(500).json({ error: error.message });
 }
});
// router.get("/universities/state/:id",async(req,res)=>{
//   try {
//     const id = req.params.id
//        const websiteData = await CombinedData.findById(id);
//        if (!websiteData) {
//            return res.status(404).json({ error: "No data found" });
//        }
//        res.json(websiteData);
//    } catch (error) {
//        res.status(500).json({ error: error.message });
//    }
// })

router.get("/universities/:state", async (req, res) => {
 try {
  let state = req.params.state.trim();
  console.log("state:", state);
  const universities = await CombinedData.find({ state });
  res.status(200).json(universities);
 } catch (error) {
  console.error("Error fetching universities:", error);
  res.status(500).json({ message: "Internal server error" });
 }
});

router.patch(
 "/updateData/:id",
 upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
 ]),
 async (req, res) => {
  try {
   const { id } = req.params;
   const updatedData = req.body;

   // If images are being updated, handle file upload
   if (req.files) {
    const { image1, image2 } = req.files;
    // Update the updatedData object with the new image file paths or other relevant data
    updatedData.image1 = image1 ? `/uploads1/${image1[0].filename}` : null;
    updatedData.image2 = image2 ? `/uploads1/${image2[0].filename}` : null;
   }

   const result = await CombinedData.findByIdAndUpdate(id, updatedData, {
    new: true,
   });

   if (!result) {
    return res.status(404).json({ message: "Data not found" });
   }

   res
    .status(200)
    .json({ message: "Data updated successfully", updatedData: result });
  } catch (error) {
   console.error(error);
   res.status(500).json({ message: "Internal server error" });
  }
 }
);
router.delete("/deleteData/:id", async (req, res) => {
 try {
  const { id } = req.params;

  // Attempt to delete the data
  const deletedData = await CombinedData.findByIdAndDelete(id);

  if (!deletedData) {
   return res.status(404).json({ message: "Data not found" });
  }

  res.status(200).json({ message: "Data deleted successfully" });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
 }
});
router.get("/colleges/:course", async (req, res) => {
 try {
  const courseName = req.params.course.trim();
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 documents per page

  // Query for matching documents with pagination
  const skip = (page - 1) * limit;
  const universities = await CombinedData.find({
   "courses.course": { $regex: new RegExp(courseName, "i") },
  })
   .skip(skip)
   .limit(limit);

  // Count total number of matching documents
  const totalCount = await CombinedData.countDocuments({
   "courses.course": { $regex: new RegExp(courseName, "i") },
  });

  // Calculate total pages based on total count and limit
  const totalPages = Math.ceil(totalCount / limit);

  res.status(200).json({
   universities,
   pagination: {
    totalResults: totalCount,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
   },
  });
 } catch (error) {
  console.error("Error finding universities by course:", error);
  res.status(500).json({ error: "Internal server error" });
 }
});

router.get("/college/:collegename", async (req, res) => {
 try {
  const collegename = req.params.collegename;
  const collegeData = await CombinedData.findOne({ collegename });
  if (!collegeData) {
   return res.status(404).json({ message: "College not found" });
  }
  res.json(collegeData);
 } catch (error) {
  console.error("Error fetching college data:", error);
  res.status(500).json({ message: "Internal server error" });
 }
});

module.exports = router;
