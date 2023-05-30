import express from "express";
import {
  register,
  login,
  getUser,
  updateUser,
  postPhoto,
} from "../controller/UserController.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.post("/user/:id/postPhoto", upload.single("photo"), postPhoto);

export default router;
