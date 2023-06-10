import Like from "../model/LikeModel.js";
import Post from "../model/PostModel.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export const like = async (req, res) => {
  const { postId } = req.params;
  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  const decodedToken = jwt.verify(token, secretKey);
  const likePost = await Like.findAll({ where: { postId: postId } });

  try {
    if (likePost.length) {
      await Like.destroy({ where: { postId: likePost[0].postId } });
      return res.status(200).json({
        error: false,
        message: "Post success unliked!",
      });
    }
    await Like.create({
      id: `like-${uuidv4()}`,
      postId: postId,
      userId: decodedToken.userId,
    });

    return res.status(200).json({
      error: false,
      message: "Post success liked!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error!",
    });
  }
};
