import express from "express";
import {
  createTodos,
  getAllTodos,
  deleteTodos,
  updateTodos,
} from "../controllers/getAllTodos.js";

const router = express.Router();

router.get("/getAllTodos/:id", getAllTodos);
router.post("/createTodos/:id", createTodos);
router.delete("/deleteTodos/:id", deleteTodos);
router.patch("/updateTodos/:id", updateTodos); //each todo id
 
export default router;
