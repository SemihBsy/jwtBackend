// import mongoose connection
import mongoose from "../connection/connection.js";
// Schema model mongoose connection
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {timestamps:true});

const User = model("user", userSchema);

export default User;