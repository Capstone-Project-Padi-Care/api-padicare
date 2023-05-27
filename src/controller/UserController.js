import User from "../model/UserModel.js";
import multer from "multer";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export const register = async (req, res) => {
  const { name, username, email, password, phoneNumber } = req.body;
  const id = `user-${uuidv4()}`;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    console.log(hashedPassword);
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

    const token = jwt.sign(
      { userId: checkUsername[0].userId },
      process.env.ACCESS_TOKEN_SECRET
    );

    const checkPassword = await bcrypt.compare(
      password,
      checkUsername[0].password
    );

    if (checkPassword == true) {
      return res.status(200).json({
        error: false,
        message: "Login successfully",
        loginResult: {
          userId: checkUsername[0].userId,
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
    console.error("Error uploading post feed:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};
