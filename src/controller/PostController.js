import Post from "../model/PostModel.js";
import User from "../model/UserModel.js";
import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import Like from "../model/LikeModel.js";

const storage = new Storage({
  projectId: "padicare",
  keyFilename: "credentials.json",
});

export const uploadPostFeed = async (req, res) => {
  const { title, description } = req.body;
  const photo = req.file;

  // Check if the request contains a valid image file
  if (
    !photo ||
    !photo.mimetype.startsWith("image/") ||
    photo.size > 1 * 1024 * 1024
  ) {
    return res.status(400).json({
      error: true,
      message: "Invalid image file. Maximum file size is 1MB.",
    });
  }

  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  const decodedToken = jwt.verify(token, secretKey);

  const bucketName = "padicare"; //edit this
  const fileName = `${uuidv4()}.${photo.mimetype.split("/")[1]}`;

  try {
    const bucket = storage.bucket(bucketName);
    await bucket.upload(photo.path, {
      destination: fileName,
      public: true,
    });

    await Post.create({
      id: `post-${uuidv4()}`,
      title: title,
      description: description,
      photoUrl: `https://storage.googleapis.com/${bucketName}/${fileName}`,
      userId: decodedToken.userId,
    });

    return res.status(200).json({
      error: false,
      message: "Post successfully created",
    });
  } catch (error) {
    console.error("Error uploading post feed:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

export const getAllPosts = async (req, res) => {
  const page = req.query.page || 1;
  const size = req.query.size || 5;
  const offset = (page - 1) * size;

  try {
    const listPost = await Post.findAll({
      limit: parseInt(size),
      offset: offset,
      include: [
        { model: User, as: "user", attributes: ["username", "photoUrl"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      error: false,
      message: "Posts successfully fetched",
      listPost: listPost,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

export const getDetailPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOne({
      where: {
        id: id,
      },
    });

    if (!post) {
      return res.status(404).json({
        error: true,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Post successfully fetched",
      data: post,
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

export const viewPost = async (req, res) => {
  const { id } = req.params;

  try {
    await Post.increment(
      {
        views: 1,
      },
      {
        where: { id },
      }
    );

    return res.status(200).json({
      error: false,
      message: "Post success liked!",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};
