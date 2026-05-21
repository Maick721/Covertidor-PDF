const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

// 🔥 DEBUG CLAVE
app.use((req, res, next) => {
  console.log("METHOD:", req.method, "URL:", req.url);
  next();
});

app.post("/convert", upload.single("file"), (req, res) => {
  console.log("REQ FILE:", req.file); // 🔥 aquí validas

  if (!req.file) {
    return res.status(400).json({
      error: "No file received",
    });
  }

  const fileUrl = `http://192.168.100.9:3001/uploads/${req.file.filename}`;

  res.json({
    success: true,
    url: fileUrl,
  });
});

app.use("/uploads", express.static("uploads"));

app.listen(3001, () => {
  console.log("🚀 SaaS funcionando en http://localhost:3001");
});