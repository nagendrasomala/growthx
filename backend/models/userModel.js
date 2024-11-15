import mongoose from "mongoose";  // Import mongoose

const userSchema = new mongoose.Schema({  
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);  

export default User;  // Export the model
