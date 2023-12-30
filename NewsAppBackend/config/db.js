const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `MongoDB is now connected ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`.red.bold);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB;
