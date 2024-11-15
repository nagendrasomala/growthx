import mongoose from "mongoose";  // Import mongoose

const adminSchema = new mongoose.Schema({  // Use mongoose.Schema
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema);  // Define the model

export default Admin;  // Export the model
