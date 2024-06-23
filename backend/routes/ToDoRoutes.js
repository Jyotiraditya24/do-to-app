import express from "express";
import { getAllTodos } from "../controllers/getAllTodos";

const router = express.Router();

router.get("/getAllTodos/:id", getAllTodos);

export default router;
