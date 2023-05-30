import express from "express";
import bodyParser from "body-parser";
import PostRoutes from "./src/routes/PostRoutes.js";
import AuthRoutes from "./src/routes/AuthRoutes.js";
import CommentRoutes from "./src/routes/CommentRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
const baseUrl = process.env.BASE_URL;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(PostRoutes);
app.use(AuthRoutes);
app.use(CommentRoutes);

app.listen(port, baseUrl, () => {
  console.log(`Server is running on ${port}`);
});
