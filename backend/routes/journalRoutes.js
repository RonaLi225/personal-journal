const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Entry = require("../models/entry");

// Middleware לאימות משתמש
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

// שליפת רשומות
router.get("/", authenticate, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ msg: "שגיאה בשרת" });
  }
});

// הוספת רשומה חדשה
router.post("/", authenticate, async (req, res) => {
  const { title, content, date, location } = req.body;

  if (!title || !content || !date || !location) {
    return res.status(400).json({ msg: "נא למלא את כל השדות" });
  }

  try {
    const newEntry = new Entry({
      user: req.user.id,
      title,
      content,
      date,
      location,
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "שגיאה בשמירת הרשומה" });
  }
});

// מחיקת רשומה לפי ID
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const entry = await Entry.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!entry) {
      return res.status(404).json({ msg: "הרשומה לא נמצאה" });
    }
    res.json({ msg: "הרשומה נמחקה בהצלחה" });
  } catch (err) {
    console.error("שגיאה במחיקה:", err);
    res.status(500).json({ msg: "שגיאה במחיקת הרשומה" });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const entry = await Entry.findOne({ _id: req.params.id, user: req.user.id });
    if (!entry) return res.status(404).json({ msg: "לא נמצא" });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ msg: "שגיאה בשרת" });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  const { title, content, date, location } = req.body;

  try {
    const entry = await Entry.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content, date, location },
      { new: true }
    );

    if (!entry) return res.status(404).json({ msg: "לא נמצא" });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ msg: "שגיאה בעדכון הרשומה" });
  }
});


module.exports = router;
