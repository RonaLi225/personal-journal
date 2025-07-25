const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Entry = require("../models/entry"); 

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ msg: "אין גישה - לא מחובר" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "טוקן לא תקף" });
  }
};

router.get("/", authenticate, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ msg: "שגיאה בשרת" });
  }
});

router.post("/", authenticate, async (req, res) => {
  const { title, content, date, location } = req.body;

  if (!title || !content || !date || !location) {
    return res.status(400).json({ msg: "נא למלא את כל השדות" });
  }

  try {
    const newEntry = new Entry({
      user: req.user.id, 
      content,
      date,
      location,
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    console.error("שגיאה בשמירת הרשומה:", err);
    res.status(500).json({ msg: "שגיאה בשמירת הרשומה" });
  }
});

module.exports = router;
