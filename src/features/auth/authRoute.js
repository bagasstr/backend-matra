import { loginController, logoutController } from "./authController.js";
import express from "express";

const router = express.Router();

router.post("/login", loginController);
router.post("/logout", logoutController);

export default router;
