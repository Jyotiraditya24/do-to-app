import express from "express";
import connection from "./utlis/connection.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import toDoRoutes from "./routes/ToDoRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/todo", toDoRoutes);

app.listen(PORT, () => {
  connection();
  console.log(`Server running on port ${PORT}`);
});
