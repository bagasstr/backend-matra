import express from "express";
import {
  createVendorController,
  deleteVendorController,
  getVendorByIdController,
  getVendorController,
} from "./vendorController.js";
import { vendorValidation } from "../../middleware/validation.js";
import {
  errorHandlerMulter,
  middlewareUpload,
} from "../../middleware/formidableMiddleware.js";

const router = express.Router();

router.get("/", getVendorController);
router.get("/:id", getVendorByIdController);
router.post("/", middlewareUpload, errorHandlerMulter, createVendorController);
router.delete("/:id", deleteVendorController);

export default router;
