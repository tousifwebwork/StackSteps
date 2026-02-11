const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/authDB");

 
dotenv.config({
  path: path.join(__dirname, "../.env"),
});
 
console.log("Loaded MONGO_URL:", process.env.MONGO_URL);

if (!process.env.MONGO_URL) {
  console.error("❌ MONGO_URL still undefined");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Mongo error:", err);
    process.exit(1);
  });

async function createAdmin() {
  const adminExists = await User.findOne({ role: "admin" });
  if (adminExists) {
    console.log("Admin already exists");
    process.exit();
  }

  await User.create({
    fullname: "Admin",
    username: "admin",
    email: "admin@stacksteps.com",
    password: "admin123", // plain password (as you want)
    role: "admin",
  });

  console.log("Admin created successfully");
  process.exit();
}

createAdmin();