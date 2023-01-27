import Student from "../models/student.js";
import auth from "../auth/midware.js";
import express from "express";
const router = express.Router();

// Error handler
const catcher = (res) => (error) => res.status(400).json({ error });

// "/student" - index route
router.get("/", auth, async (req, res) => {
  const { username } = req.payload;
  const students = await Student.find({ username }).catch(catcher(res));
  res.json(students);
});

// "/student" - create route
router.post("/", auth, async (req, res) => {
  const { username } = req.payload;
  req.body.username = username;
  const student = await Student.create(req.body).catch(catcher(res));
  res.json(student);
});

// "/student/:id" - update route
router.put("/:id", auth, async (req, res) => {
  const { username } = req.payload;
  req.body.username = username;
  const { id } = req.params;
  const student = await Student.findByIdAndUpdate(id, req.body, {new: true}).catch(
    catcher(res)
  );
  res.json(student);
});

// "/student/:id" - delete route
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndRemove(id).catch(catcher(res));
  res.json(student);
});

// "/student/:id" - show route
router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id).catch(catcher(res));
  res.json(student);
});

export default router;
