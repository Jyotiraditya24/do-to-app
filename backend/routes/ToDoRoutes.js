import express from "express";
import { getAllTodos } from "../controllers/getAllTodos.js";

const router = express.Router();

router.get("/getAllTodos/:id", getAllTodos);

export default router;
