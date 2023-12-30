const News = require('../models/newsModel');
const ImageToBase64 = require('image-to-base64');

// Add News
 const  addNews = async (req, res, next) => {
  try {
    console.log(req.body);
    const {title,content,author,category,addToSlider} = req.body;

    const base64Data = await ImageToBase64(req.files.newsImage.path);
       // console.log('base64', base64Data);
       const news = await News.create({
         author,
         content,
         title,
         category,
         addToSlider,
         newsImage: `data:${req.files.newsImage.type};base64,${base64Data}`,
         addedAt: Date.now(),
       });
       if(news){
        res.status(201).json({
            success:true,
            msg:'successfully added news',
            data:news
        })
       }else{
        res.status(400).json({
            success:false,
            msg:'Invalid News Data'
        });
       }

  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal error occurred"
    });
  }
};
// fetch all news

  const getAllNews = async (req, res) => {
  const news = await News.find();
  if (news) {
    res.json(news);
  } else {
    res.status(404).json({
      success: false,
      msg: "User not found",
    });
  }
};


module.exports = {
  addNews,
  getAllNews,
};











