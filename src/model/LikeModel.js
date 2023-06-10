import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Like = db.define(
  "likes",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Like.belongsTo(User, {
  foreignKey: {
    name: "userId",
    type: DataTypes.STRING,
  },
  as: "user",
});

export default Like;

(async () => {
  await db.sync();
})();
