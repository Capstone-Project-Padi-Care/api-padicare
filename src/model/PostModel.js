import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Post = db.define(
  "posts",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photoUrl: DataTypes.STRING,
    like: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

export default Post;

(async () => {
  await db.sync();
})();
