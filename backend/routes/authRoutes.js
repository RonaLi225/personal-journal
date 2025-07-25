const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// הרשמה
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (userExists) {
      return res.status(400).json({ msg: "משתמש כבר קיים" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, msg: "נרשמת בהצלחה" });
  } catch (err) {
    console.error("שגיאה בהרשמה:", err);
    res.status(500).json({ msg: "שגיאה בשרת" });
  }
});

// התחברות
router.post("/login", async (req, res) => {
  const { identifier, password } = req.body; // יכול להיות שם משתמש או אימייל

  try {
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }]
    });

    if (!user) return res.status(400).json({ msg: "משתמש לא נמצא" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "סיסמה שגויה" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, msg: "ברוכה הבאה!" });
  } catch (err) {
    console.error("שגיאה בהתחברות:", err);
    res.status(500).json({ msg: "שגיאה בשרת" });
  }
});

module.exports = router;
