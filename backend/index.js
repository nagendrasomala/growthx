import express, { json } from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

config();
connectDB();

const app = express();
app.use(json());

app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
