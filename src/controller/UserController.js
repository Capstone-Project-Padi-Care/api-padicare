import User from "../model/UserModel.js";
import multer from "multer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const register = async (req, res) => {
  const { name, username, email, password, phoneNumber } = req.body;
  const id = `user-${uuidv4()}`;
  const hashedPassword = bcrypt.hash(password);
  try {
    await User.create({
      id,
      name,
      username,
      email,
      password: hashedPassword,
      phoneNumber,
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

const login = async (req, res) => {
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

    const token = jwt.sign(
      { userId: checkUsername[0].userId },
      process.env.ACCESS_TOKEN_SECRET
    );

    if (bcrypt.compare(password, checkUsername[0].password))
      return res.status(200).json({
        error: false,
        token: token,
        message: "Login successfully",
      });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export default { register, login };
