const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // תופס רק את הטוקן אחרי "Bearer"
  if (!token) return res.status(401).json({ msg: "אין טוקן" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "טוקן לא תקין" });
  }
}

module.exports = verifyToken;
