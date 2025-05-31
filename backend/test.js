const mongoose = require("mongoose");

const uri =
  "mongodb+srv://Daman_Rakwal:daman@cluster0.fcunlng.mongodb.net/Placement?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected with Mongoose!");
    return mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Failed to connect:", err.message);
  });
