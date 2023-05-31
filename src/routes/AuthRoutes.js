import express from "express";
import {
  register,
  login,
  getUser,
  updateUser,
  postPhoto,
} from "../controller/UserController.js";
import multer from "multer";
import { auth } from "../middleware/AuthMiddleware.js";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.post("/user/:id/postPhoto", auth, upload.single("photo"), postPhoto);

export default router;
