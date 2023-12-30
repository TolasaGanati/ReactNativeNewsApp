const User = require("../models/UserModel");
var mailer = require("../utils/Mailer");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        msg: "Entered email id is already registered with us. Login to continue",
      });
    } 

    const user = new User({
      name,
      email,
      password,
    });

    // save user object
    try {
      await user.save();
      res.status(201).json({
        success: true,
        msg:'Account Created successfully. Please log in.'
      });
    } catch (error) {
      console.error("Error saving user:", error);
      return next(error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "server having some issues",
    });
  }
};

const authUser = async (req, res)=>{
  console.log(req.body);
  const{email, password}=req.body;

  const user = await User.findOne({ email: req.body.email});
  console.log(user);
  if(user){
    res.json({
      _id:user.id,
      name:user.name,
      email:user.email,
      avatar:user.avatar,
      token:generateToken(user._id)
    })
  }else{
    res.status(401).json({
      success:false,
      msg:'Unauthorized user'
    })
  }
};


const getUserProfile = async (req, res) => {
  const user = await User.findById(req.header._id);
  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } else {
    res.status(404).json({
      success: false,
      msg: "User not found",
    });
  }
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.header._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      avatar: updateUser.avatar,
      token: generateToken(updateUser - _id),
    });
  } else {
    res.status(404).json({
      success: false,
      msg: "user not found",
    });
  }
};

module.exports = {
  registerUser, 
  getUserProfile,
  authUser,
  updateUserProfile,
};
