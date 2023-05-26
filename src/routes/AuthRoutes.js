import express from "express";
import { register, login } from "../controller/UserController";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

export default router;
