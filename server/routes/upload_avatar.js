const router = require("express").Router();
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");

const fs = require("fs");

//we will upkload image in cloudinary
cloudinary.config({
  cloud_name: "dnsgwvchg",
  api_key: "914253726253256",
  api_secret: "3mLZp5IhyWyQrcO0QV4a2KAqBSU",
});

router.post("/upload_avatar", auth, (req, res) => {
  try {
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: "No files were uploaded" });

    const file = req.files.file;
    if (file.size > 1024 * 1024) {
      removeTemp(file.tempFilePath);
      return res.status(400).json({ msg: "size too large" });
    }

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTemp(file.tempFilePath);
      return res.status(400).json({ msg: "File formate is incorrect " });
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "test" },
      async (err, result) => {
        if (err) throw err;
        removeTemp(file.tempFilePath);
        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );

    // res.json('test upload')
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

const removeTemp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
