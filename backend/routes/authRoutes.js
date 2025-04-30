// routes/authRoutes.js
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const USER = { username: "admin", password: "password" };

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

export default router;
