import express from "express";
import {
  addComment,
  deleteComment,
  getCommnet,
} from "../controller/CommentController.js";
import { auth } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/posts/:idPost/comment", auth, getCommnet);
router.post("/posts/:idPost/comment", auth, addComment);
router.delete("/posts/:idPost/comment/:id", auth, deleteComment);

export default router;
