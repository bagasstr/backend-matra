import express from "express";
import {
  createSeoController,
  getSeoByIdController,
  getSeoController,
  updateSeoController,
} from "./seoController.js";

const router = express.Router();

router.get("/", getSeoController);
router.get("/:id", getSeoByIdController);
router.post("/", createSeoController);
router.put("/:id", updateSeoController);

export default router;
