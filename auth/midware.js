import dotenv from "dotenv";
dotenv.config();
const { SECRET } = process.env;
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    //Authorization: "Bearer -token-"
    // checks authorization header
    if (req.headers.authorization) {
      // pulls out token
      const token = req.headers.authorization.split(" ")[1];
      // verify token
      const payload = await jwt.verify(token, SECRET);
      if (payload) {
        // passing payload into request object
        req.payload = payload;
        next();
      } else {
        res.status(400).json({ error: "VERIFICATION FAILED OR NO PAYLOAD" });
      }
    } else {
      res.status(400).json({ error: "NO AUTHORIZATION HEADER" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default auth;
