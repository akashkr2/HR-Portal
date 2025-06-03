import express from "express";
import { empLogin, empRegister } from "../controllers/authController.js";

const router = express.Router();

router.post("/employee/register", empRegister);

router.post("/employee/login", empLogin);

export default router
