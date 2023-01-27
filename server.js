// Import dependencies
import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import mongoose from "./connection/connection.js";
import StudentRouter from "./controllers/student.js";
import AuthRouter from "./controllers/user.js";
import auth from "./auth/midware.js";

// Register middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes and routers
app.get("/", auth, (req, res) => {
  res.json(req.payload);
});

// Router
app.use("/auth", AuthRouter);
app.use("/student", StudentRouter);

// Listener
const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
