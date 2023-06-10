import express from "express";
import {
  uploadPostFeed,
  getAllPosts,
  getDetailPost,
  viewPost,
} from "../controller/PostController.js";
import { like } from "../controller/LikeController.js";
import { auth } from "../middleware/AuthMiddleware.js";
import multer from "multer";
import { apiKey } from "../middleware/ApiKeyMiddleware.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.use(apiKey);
router.post("/posts", auth, upload.single("photo"), uploadPostFeed);
router.get("/posts/", getAllPosts);
router.get("/posts/:id", getDetailPost);
router.post("/posts/:postId/like", like);
router.put("/posts/:id/views", auth, viewPost);

export default router;
