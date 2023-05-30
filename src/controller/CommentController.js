import Comment from "../model/CommentModel.js";
import { v4 as uuidv4 } from "uuid";

export const getCommnet = async (req, res) => {
  try {
    const { idPost } = req.params;
    const commnets = await Comment.findAll({ where: { postId: idPost } });
    return res.status(200).json({
      error: false,
      listComment: commnets,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error!",
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { comment, userId, postId } = req.body;
    await Comment.create({
      id: `comment-${uuidv4()}`,
      comment,
      userId,
      postId,
    });
    return res.status(200).json({
      error: false,
      message: "Comment added!",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error!",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.destroy({ where: { id: id } });
    return res.status(200).json({
      error: false,
      message: "Comment deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error!",
    });
  }
};
