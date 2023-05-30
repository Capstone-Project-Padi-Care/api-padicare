import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";

export const auth = (req, res, next) => {
  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).json({
        error: true,
        message: "Unathorized",
      });
    }

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(403).json({
          code: 403,
          message: "Forbidden",
        });
      }
      const checkToken = await User.findOne({ where: { token: token } });

      if (!checkToken) {
        return res.status(403).json({
          code: 403,
          message: "Forbidden",
        });
      }

      return next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};
