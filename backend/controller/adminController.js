import Admin from "../models/adminModel.js";
import Assignment from "../models/assignmentModel.js";
import bcrypt from "bcryptjs";
const { hash, compare } = bcrypt;
import jwt from "jsonwebtoken";
const { sign } = jwt;

// Register admin
export const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

    try {
        const hashedPassword = await hash(password, 10);
        const admin = new Admin({ name, email, password: hashedPassword });
        await admin.save();
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login admin
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get assignments for admin
export const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ adminId: req.admin.id }).populate("userId", "name");
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update assignment status
export const updateAssignmentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const assignment = await Assignment.findByIdAndUpdate(id, { status }, { new: true });
        if (!assignment) return res.status(404).json({ message: "Assignment not found" });
        res.status(200).json({ message: "Assignment status updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
