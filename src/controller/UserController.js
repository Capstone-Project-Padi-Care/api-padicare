import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: "padicare",
  keyFilename: "credentials.json",
});

export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const id = `user-${uuidv4()}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const checkUsername = await User.findAll({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    if (checkUsername.length) {
      return res.status(401).json({
        error: true,
        message: "Username or email is already exist",
      });
    }
    await User.create({
      id,
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      error: false,
      message: "User Created",
    });
  } catch (error) {
    console.error("Error uploading post feed:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const checkUsername = await User.findAll({
      where: {
        [Op.or]: [{ username: username }, { email: username }],
      },
    });

    if (checkUsername.length < 1) {
      return res.status(404).json({
        error: true,
        message: "Username not found",
      });
    }

    const checkPassword = await bcrypt.compare(
      password,
      checkUsername[0].password
    );

    if (checkPassword == true) {
      const token = jwt.sign(
        { userId: checkUsername[0].id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          algorithm: "HS256",
        }
      );

      await User.update(
        { token: token },
        { where: { username: checkUsername[0].username } }
      );

      return res.status(200).json({
        error: false,
        message: "Login successfully",
        loginResult: {
          userId: checkUsername[0].id,
          name: checkUsername[0].name,
          token: token,
        },
      });
    }

    return res.status(403).json({
      error: true,
      message: "Login fail!",
    });
  } catch (error) {
    console.error("Error login:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id: id,
      },
      attributes: [
        "name",
        "username",
        "email",
        "createdAt",
        "photoUrl",
        "phoneNumber",
      ],
    });

    if (user) {
      return res.status(200).json({
        error: false,
        message: "Fetch User Successfully",
        data: user,
      });
    }

    return res.status(404).json({
      error: true,
      message: "User Not Found!",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error!",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phoneNumber } = req.body;
    const hashedPassword = await bcrypt.hash("password", 10);

    const checkUsername = await User.findAll({
      where: {
        [Op.or]: [{ username: username }, { email: username }],
      },
    });

    if (checkUsername.length && checkUsername[0].email == email) {
      if (password != null) {
        await User.update(
          {
            id,
            name,
            email,
            password: hashedPassword,
            phoneNumber,
          },
          { where: { id: id } }
        );
      } else {
        await User.update(
          {
            id,
            name,
            email,
            phoneNumber,
          },
          { where: { id: id } }
        );
      }
    } else if (checkUsername.length && checkUsername[0].email != email) {
      return res.status(400).json({
        error: true,
        message: "Email is already used!",
      });
    }

    return res.status(200).json({
      error: false,
      message: "User Updated!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: false,
      message: "Internal Server Error!",
    });
  }
};

export const postPhoto = async (req, res) => {
  const { id } = req.params;
  const photo = req.file;

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
  const bucketName = "padicare"; //edit this
  const fileName = `${uuidv4()}.${photo.mimetype.split("/")[1]}`;

  try {
    const bucket = storage.bucket(bucketName);
    await bucket.upload(photo.path, {
      destination: fileName,
      public: true,
    });

    await User.update(
      {
        photoUrl: `https://storage.googleapis.com/${bucketName}/${fileName}`,
      },
      { where: { id } }
    );

    return res.status(200).json({
      error: false,
      message: "Photo Updated!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: false,
      message: "Internal Server Error!",
    });
  }
};
