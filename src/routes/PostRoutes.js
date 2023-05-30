import express from "express";
import {
  uploadPostFeed,
  getAllPosts,
  getDetailPost,
} from "../controller/PostController.js";
import { auth } from "../middleware/AuthMiddleware.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/posts", auth, upload.single("photo"), uploadPostFeed);
router.get("/posts/", getAllPosts);
router.get("/posts/:id", getDetailPost);

export default router;
