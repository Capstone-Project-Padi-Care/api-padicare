import express from "express";
import {
  uploadPostFeed,
  getAllPosts,
  getDetailPost,
} from "../controller/PostController.js";
import { auth } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/post", auth, uploadPostFeed);
router.get("/post/", getAllPosts);
router.get("/post/:id", getDetailPost);

export default router;
