import jwt from "jsonwebtoken";  
const { sign } = jwt;  
import bcrypt from "bcryptjs"; 
const { hash, compare } = bcrypt; 
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
import Assignment from "../models/assignmentModel.js";

// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

    try {
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Upload assignment
const uploadAssignment = async (req, res) => {
    const { userId, task, adminId } = req.body;

    try {
        const assignment = new Assignment({ userId, task, adminId });
        await assignment.save();
        res.status(201).json({ message: "Assignment uploaded successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch admins
const fetchAdmins = async (req, res) => {
    try {
        const admins = await Admin.find().select("name email");
        res.status(200).json(admins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default { registerUser, loginUser, uploadAssignment, fetchAdmins };
