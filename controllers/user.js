import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
const router = express.Router();
const { SECRET } = process.env;

router.post("/signup", async (req, res) => {
  try {
    // hashed password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create a new user
    const newUser = await User.create(req.body);
    // return json
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // creating username with value
    const user = await User.findOne({ username });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = await jwt.sign({ username }, SECRET);
        res.status(200).json({ token });
      } else {
        res.status(400).json({ error: "PASSWORD MISMATCH" });
      }
    } else {
      res.status(400).json({ error: "USER NOT FOUND" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default router;
