const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const University = require("./models/University");
const Universitydes = require("./models/Universitydescription");
const dataRoutes = require("./routes/dataRoutes");
const CombinedData = require("./models/Combinedata");
const bodyParser = require("body-parser");
const userRouter = require("./routes/Add/User");
const blogRoute = require("./routes/Add/Blog");
const router = require("./routes/Add/Contact");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(bodyParser.json({ limit: "500kb" }));
app.use(bodyParser.urlencoded({ limit: "500kb", extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
mongoose
 .connect(
  `mongodb+srv://pushpendra:prateek8900@cluster0.edbmizv.mongodb.net/data?retryWrites=true&w=majority`
 )
 .then(() => {
  console.log("Connected to database MongoDB");
 })
 .catch((error) => {
  console.error("MongoDB connection error:", error);
 });
const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, "uploads/");
 },
 filename: function (req, file, cb) {
  cb(null, Date.now() + file.originalname);
 },
});
const upload = multer({ storage: storage });
app.get("/sampleDocument", async (req, res) => {
 try {
  const sampleDocument = await CombinedData.findOne();
  console.log(sampleDocument.courses[0].course); // Log the sample document to the console
  res.json(sampleDocument); // Return the sample document as the response
 } catch (error) {
  console.error("Error retrieving sample document:", error);
  res.status(500).json({ message: "Internal server error" });
 }
});
app.use("/api", dataRoutes);
app.use("/api", userRouter);
app.use("/api", blogRoute);
app.use("/api", router);
app.get("/", (req, res) => {
 try {
  res.send("Hello");
 } catch (error) {}
});

app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});

// app.post("/api/universities", upload.single("logo"), async (req, res) => {
//   try {
//     const { name, courses, state, location, fees } = req.body;

//     const logoUrl = req.file ? `/uploads/${req.file.filename}` : "";
//     const university = new University({
//       name: req.body.name,
//       courses: req.body.courses,
//       state: req.body.state,
//       location: req.body.location,
//       fees: req.body.fees,
//       logoUrl: logoUrl,
//     });

//     await university.save();
//     res.status(200).json({ message: "University added successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// app.get("/api/all/universities", async (req, res) => {
//   try {
//     const universities = await University.find();
//     // console.log("Fetched universities:", universities);
//     res.status(200).json(universities);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// app.patch("/api/update/university/:universityId", async (req, res) => {
//   try {
//     const universityId = req.params.universityId;
//     const updatedUniversityData = req.body;

//     const updatedUniversity = await University.findByIdAndUpdate(universityId, updatedUniversityData, { new: true });
//     // const updateCombinedData= await CombinedData.findByIdAndUpdate(universit)
//     if (!updatedUniversity) {
//       return res.status(404).json({ message: "University not found" });
//     }
//     res.status(200).json(updatedUniversity);
//     console.log('updatedUniversity:', updatedUniversity)
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// app.delete("/api/delete/university/:universityId", async (req, res) => {
//   try {
//     const universityId = req.params.universityId;
//     const deletedUniversity = await University.findByIdAndDelete(universityId);
//     if (!deletedUniversity) {
//       return res.status(404).json({ message: "University not found" });
//     }
//     res.status(200).json({ message: "University deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.get("/api/universities/:state", async (req, res) => {
//   try {
//     res.send("chal ja bhosedi ke")
//     // let state = req.params.state.trim(); // Trim leading and trailing whitespace
//     // // console.log("Fetching universities for state:", state); // Add this line
//     // const universities = await CombinedData.find({ state });
//     // // console.log("Fetched universities:", universities); // Add this line
//     // res.status(200).json(universities);
//   } catch (error) {
//     console.error("Error fetching universities:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// // app.get("/api/universities/:state", async (req, res) => {
// //   try {
// //     let state = req.params.state.trim(); // Trim leading and trailing whitespace
// //     // console.log("Fetching universities for state:", state); // Add this line
// //     const universities = await CombinedData.find({ state });
// //     // console.log("Fetched universities:", universities); // Add this line
// //     res.status(200).json(universities);
// //   } catch (error) {
// //     console.error("Error fetching universities:", error);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // });

// // app.get("/api/universities/:state", async (req, res) => {
// //   try {
// //     const state = req.params.state.replace("%20", " "); // Replace %20 with space
// //     // console.log("Fetching universities for state:", state); // Add this line
// //     const universities = await CombinedData.find({ state });
// //     // console.log("Fetched universities:", universities); // Add this line
// //     res.status(200).json(universities);
// //   } catch (error) {
// //     console.error("Error fetching universities:", error);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // });
// app.get("/api/colleges/:course", async (req, res) => {
//   try {
//     const course = req.params.course.replace("%20", " "); // Replace %20 with space
//     // console.log("Fetching universities for state:", course); // Add this line
//     const universities = await University.find({
//       courses: { $regex: new RegExp(course, "i") },
//     });
//     // console.log("Fetched universities:", universities); // Add this line
//     res.status(200).json(universities);
//   } catch (error) {
//     console.error("Error fetching universities:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// app.get("/api/college/:collegename", async (req, res) => {
//   try {
//     const collegename = req.params.collegename;
//     const collegeData = await CombinedData.findOne({ collegename });
//     if (!collegeData) {
//       return res.status(404).json({ message: "College not found" });
//     }
//     res.json(collegeData);
//   } catch (error) {
//     console.error("Error fetching college data:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");

// const multer = require("multer");
// const University = require("./models/University");
// const Universitydes = require("./models/Universitydescription");
// const dataRoutes = require("./routes/dataRoutes");
// const CombinedData = require("./models/Combinedata");
// const bodyParser = require("body-parser");
// const userRouter = require("./routes/Add/User");
// const blogRoute = require("./routes/Add/Blog");
// const router = require("./routes/Add/Contact");

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json({ limit: "10mb" }));
// app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// mongoose.connect(
//   `mongodb+srv://pushpendra:1234@cluster0.edbmizv.mongodb.net/data?retryWrites=true&w=majority`
// );
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });
// app.post("/api/universities", upload.single("logo"), async (req, res) => {
//   try {
//     const { name, courses, state, location, fees } = req.body;

//     const logoUrl = req.file ? `/uploads/${req.file.filename}` : "";
//     const university = new University({
//       name: req.body.name,
//       courses: req.body.courses,
//       state: req.body.state,
//       location: req.body.location,
//       fees: req.body.fees,

//       logoUrl: logoUrl,
//     });

//     await university.save();
//     res.status(200).json({ message: "University added successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// app.get("/api/all/universities", async (req, res) => {
//   try {
//     const universities = await University.find();
//     console.log("Fetched universities:", universities);
//     res.status(200).json(universities);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// app.put("/api/update/university/:universityId", async (req, res) => {
//   try {
//     const universityId = req.params.universityId;
//     const updatedUniversityData = req.body;
//     const updatedUniversity = await University.findByIdAndUpdate(universityId, updatedUniversityData, { new: true });
//     if (!updatedUniversity) {
//       return res.status(404).json({ message: "University not found" });
//     }
//     res.status(200).json(updatedUniversity);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// app.delete("/api/delete/university/:universityId", async (req, res) => {
//   try {
//     const universityId = req.params.universityId;
//     const deletedUniversity = await University.findByIdAndDelete(universityId);
//     if (!deletedUniversity) {
//       return res.status(404).json({ message: "University not found" });
//     }
//     res.status(200).json({ message: "University deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// app.get("/api/universities/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const university = await University.findById(id);
//     if (!university) {
//       return res.status(404).json({ message: "University not found" });
//     }
//     console.log("Fetched university:", university);
//     res.status(200).json(university);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// app.get("/api/universities/:state", async (req, res) => {
//   try {
//     const state = req.params.state.replace("%20", " "); // Replace %20 with space
//     console.log("Fetching universities for state:", state); // Add this line
//     const universities = await University.find({ state });
//     console.log("Fetched universities:", universities); // Add this line
//     res.status(200).json(universities);
//   } catch (error) {
//     console.error("Error fetching universities:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// app.get("/api/colleges/:course", async (req, res) => {
//   try {
//     const course = req.params.course.replace("%20", " "); // Replace %20 with space
//     console.log("Fetching universities for state:", course); // Add this line
//     const universities = await University.find({
//       courses: { $regex: new RegExp(course, "i") },
//     });
//     console.log("Fetched universities:", universities); // Add this line
//     res.status(200).json(universities);
//   } catch (error) {
//     console.error("Error fetching universities:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// app.get("/api/college/:collegename", async (req, res) => {
//   try {
//     const collegename = req.params.collegename;
//     const collegeData = await CombinedData.findOne({ collegename });
//     if (!collegeData) {
//       return res.status(404).json({ message: "College not found" });
//     }
//     res.json(collegeData);
//   } catch (error) {
//     console.error("Error fetching college data:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// app.use("/api", dataRoutes);
// app.use("/api", userRouter);
// app.use("/api", blogRoute);
// app.use("/api", router);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
