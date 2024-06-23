import express from "express";
import connection from "./connection.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, resp) => {
  resp.send("Hello");
});

app.listen(3000, () => {
  connection();
});
