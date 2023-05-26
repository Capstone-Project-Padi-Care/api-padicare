import express from "express";
import {
  uploadPostFeed,
  getAllPosts,
  getDetailPost,
} from "../controller/PostController.js";

const router = express.Router();

router.post("/post", uploadPostFeed);
router.get("/post/", getAllPosts);
router.get("/post/:id", getDetailPost);

export default router;
