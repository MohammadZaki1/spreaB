const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create folder if not exists
const uploadDir = path.join(__dirname, "../uploads/profilePhoto");
//const uploadDir = path.join(__dirname, "../uploads/promotions");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only JPEG and PNG images are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;





// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // Create uploads folder if not exists
// const uploadDir = "uploads";
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage });

// export default upload;
