const Notices = require("../models/Noticesmodel");
const ImageToBase64 = require("image-to-base64");

// Add Notices
const addNotices = async (req, res) => {
  try {
    console.log(req.body);
    const { title, content,noticesImage,addedAt } = req.body;

     const base64Data = await ImageToBase64(req.files.noticesImage.path);
    console.log('base64', base64Data);
    const notices = await Notices.create({
      content,
      title,
      noticesImage: `data:${req.files.noticesImage.type};base64,${base64Data}`,
      addedAt: Date.now(),
    });
    if (notices) {
      res.status(201).json({
        success: true,
        msg: "notices successfully added",
        data: notices,
      });
    } else {
      res.status(400).json({
        success: false,
        msg: "Invalid Notices Data",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal error occurred",
    });
  }
};
// fetch all notices

const getAllNotices = async (req, res) => {
  const notices = await Notices.find();
  if (notices) {
    res.json(notices);
  } else {
    res.status(404).json({
      success: false,
      msg: "Notices not found",
    });
  }
};

module.exports = {
  addNotices,
  getAllNotices,
};

