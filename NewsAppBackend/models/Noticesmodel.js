const mongoose = require("mongoose");
const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  noticesImage: String,
  addedAt: {
    type: Date,
  },
});
module.exports = mongoose.model("Notices", newsSchema);

