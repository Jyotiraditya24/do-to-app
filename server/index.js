import express from "express";
import connection from "./utlis/connection.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import toDoRoutes from "./routes/ToDoRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const PORT = process.env.PORT || 8080;

// Resolving dirname for ES Module
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/todo", toDoRoutes);

// Use the client app
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

app.listen(PORT, () => {
  connection();
  console.log(`Server running on port ${PORT}`);
});

// reinstalled
