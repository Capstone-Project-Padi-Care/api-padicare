import Comment from "../model/CommentModel.js";
import { v4 as uuidv4 } from "uuid";
import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";

export const getCommnet = async (req, res) => {
  const page = req.query.page || 1;
  const size = req.query.size || 5;
  const offset = (page - 1) * size;

  try {
    const { idPost } = req.params;
    const commnets = await Comment.findAll({
      where: { postId: idPost },
      limit: parseInt(size),
      offset: offset,
      include: [
        { model: User, as: "user", attributes: ["username", "photoUrl"] },
      ],
      order: [["createdAt", "DESC"]],
    });
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
  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  const decodedToken = jwt.verify(token, secretKey);

  try {
    const { comment } = req.body;
    const { idPost } = req.params;
    await Comment.create({
      id: `comment-${uuidv4()}`,
      comment,
      userId: decodedToken.userId,
      postId: idPost,
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
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error!",
    });
  }
};
