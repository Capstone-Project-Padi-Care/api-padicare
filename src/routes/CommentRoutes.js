import express from "express";
import { addComment, deleteComment } from "../controller/CommentController.js";

const router = express.Router();

router.get("/posts/:idPost/comment");
router.post("/comments", addComment);
router.delete("/comments", deleteComment);

export default router;
