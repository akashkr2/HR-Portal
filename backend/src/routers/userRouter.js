import express from "express";
import { getUser } from "../controllers/userController.js";
import { userProtect } from "../middleware/userMiddleware.js";

const router = express.Router();

router.get("/profile", userProtect, getUser);

export default router;
