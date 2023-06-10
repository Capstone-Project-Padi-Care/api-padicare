import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "../model/UserModel.js";
import Like from "../model/LikeModel.js";

const { DataTypes } = Sequelize;

const Post = db.define(
  "posts",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Post.belongsTo(User, {
  foreignKey: {
    name: "userId",
    type: DataTypes.STRING,
  },
});

Post.hasMany(Like, {
  foreignKey: {
    name: "postId",
    type: DataTypes.STRING,
  },
});

export default Post;

(async () => {
  await db.sync();
})();
