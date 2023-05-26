import Post from "../model/PostModel";
import multer from "multer";

const storage = new Storage({
  keyFilename: "path/to/service-account-key.json",
});

const uploadPostFeed = async (req, res) => {
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

  const bucketName = "your-bucket-name"; //edit this
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
      descrirption: description,
      photoUrl: `https://storage.googleapis.com/${bucketName}/${fileName}`,
      userId: req.body.userId,
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

const getAllPosts = async (req, res) => {
  const { page, size } = req.query;
  const offset = (page - 1) * size;

  try {
    const listPost = await Post.findAll({
      limit: size,
      offset: offset,
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

const getDetailPost = async (req, res) => {
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

export default {
  uploadPostFeed,
  getAllPosts,
  getDetailPost,
};
