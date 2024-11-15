import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";

const authenticate = (role) => async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Use jwt.verify
        if (role === "user") {
            req.user = await User.findById(decoded.id);
        } else if (role === "admin") {
            req.admin = await Admin.findById(decoded.id);
        }

        if (!req[role]) return res.status(401).json({ message: "Unauthorized" });

        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Default export
export default authenticate;
