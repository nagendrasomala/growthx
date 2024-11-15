import { Router } from "express";
import userController from "../controller/usercontroller.js";  
import authenticate from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/upload", authenticate("user"), userController.uploadAssignment);
router.get("/admins", authenticate("user"), userController.fetchAdmins);

export default router;
