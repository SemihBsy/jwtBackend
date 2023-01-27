// Import express and bookmark model
import express from "express";
import Student from "../models/student.js";

// Express router
const router = express.Router();

// Error handler
const catcher = (res) => (error) => res.status(400).json({error})

// "/student" - index route
router.get("/", async (req, res) => {
    const students = await Student.find({}).catch(catcher(res))
    res.json(students)
})

// "/student" - create route
router.post("/", async (req, res) => {
    const student = await Student.create(req.body).catch(catcher(res))
    res.json(student)
})  

// "/student/:id" - update route
router.put("/:id", async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body).catch(catcher(res))
    res.json(student)
})    

// "/student/:id" - delete route
router.delete("/:id", async (req, res) => {
    const student = await Student.findByIdAndRemove(req.params.id).catch(catcher(res))
    res.json(student)
})   

// "/student/:id" - show route
router.get("/:id", async (req, res) => {
    const student = await Student.findById(req.params.id).catch(catcher(res))
    res.json(student)
})  

export default router;