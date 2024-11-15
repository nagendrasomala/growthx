import { Router } from "express";
import { registerAdmin, loginAdmin, getAssignments, updateAssignmentStatus } from "../controller/adminController.js";
import authenticate from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/assignments", authenticate("admin"), getAssignments);  
router.put("/assignments/:id/status", authenticate("admin"), updateAssignmentStatus);  /

export default router;
