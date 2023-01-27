// Import dependencies
import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import router from "./controllers/student.js";
import mongoose from "./connection/connection.js";
import AuthRouter from "./controllers/user.js"


// Register middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes and routers
app.get("/", (req, res) => {
    res.json({message: "gotcha!"})
})

// Router
app.use("/auth", AuthRouter);
app.use("/student", router);

// Listener
const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));