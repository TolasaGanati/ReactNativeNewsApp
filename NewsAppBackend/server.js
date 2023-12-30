const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const formData = require("express-form-data");
const newsRoute = require("./routes/newsRoute");
const noticesRoute = require("./routes/noticesRoute");
const { Expo } = require("expo-server-sdk"); // Import Expo from expo-server-sdk

require("dotenv").config();
var cors = require("cors");
require("colors");

connectDB();
const app = express();

if (process.env.NODE_ENV === "development") app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(formData.parse());
app.use("/users", userRoute);
app.use("/category", categoryRoute);
app.use("/news", newsRoute);
app.use("/notices", noticesRoute);

const expo = new Expo(); // Create an instance of Expo

// Route to send push notification
app.post("/addNews", async (req, res) => {
  try {
    const { title,token } = req.body;
console.log("Received Expo push token:", token);

    // Check if the token is a valid Expo push token
    if (!Expo.isExpoPushToken(token)) {
      return res.status(400).json({ error: "Invalid Expo push token" });
    }

    // Construct the push notification
    const message = {
      to: token,
      sound: "default",
      title: title || "Default Title",
      
    };

    // Send the push notification
    let chunks = expo.chunkPushNotifications([message]);
    for (let chunk of chunks) {
      await expo.sendPushNotificationsAsync(chunk);
    }

    return res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error("Error sending push notification:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    `Server is connected in ${process.env.NODE_ENV} mode on port ${PORT}`.green
  )
);
