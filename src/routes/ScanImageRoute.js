import express from "express";
import multer from "multer";
import { scanImage } from "../controller/ScanImageController.js";

const storage = multer.memoryStorage();
const upload = multer({ dest: "uploads/", storage: storage });
const router = express.Router();

router.post("/scanImage", upload.single("img"), scanImage);

export default router;
