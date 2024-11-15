import mongoose from "mongoose";  // Import mongoose

const assignmentSchema = new mongoose.Schema({  
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    task: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
    createdAt: { type: Date, default: Date.now },
});

const Assignment = mongoose.model('Assignment', assignmentSchema); 

export default Assignment;  // Export the model
