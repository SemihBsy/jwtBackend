// import mongoose connection
import mongoose from "../connection/connection.js";

// Schema model mongoose connection
const { Schema, model } = mongoose;

// Student Schema
const studentSchema = new Schema(
  {
    username: { type: String, required: true },
    name: String,
    gender: String,
    enrollment: Number,
    address: String,
    phone: String,
    linkedin: String,
    gpa: Number,
    absences: String,
  },
  { timestamps: true }
);

// Student model
const Student = model("Student", studentSchema);

export default Student;
