import express from "express";
import connection from "./utlis/connection.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import toDoRoutes from "./routes/ToDoRoutes.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 8080;

const __dirname = path.resolve();

const app = express();
app.use(
  cors({
    origin: [],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/todo", toDoRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, resp) => {
  resp.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  connection();
  console.log(`Server running on port ${PORT}`);
});
