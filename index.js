import express from "express";
import bodyParser from "body-parser";
import PostRoutes from "./src/routes/PostRoutes.js";
import AuthRoutes from "./src/routes/AuthRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(PostRoutes);
app.use(AuthRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
