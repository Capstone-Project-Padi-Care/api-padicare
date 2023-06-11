import express from "express";
import {
  register,
  login,
  getUser,
  updateUser,
  postPhoto,
  logout,
} from "../controller/UserController.js";
import multer from "multer";
import { auth } from "../middleware/AuthMiddleware.js";
import { apiKey } from "../middleware/ApiKeyMiddleware.js";

const upload = multer({ dest: "uploads/" });

const router = express.Router();
router.use(apiKey);
router.post("/login", login);
router.post("/register", register);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.post("/user/:id/postPhoto", upload.single("photo"), postPhoto);
router.delete("/logout", auth, logout);

export default router;
