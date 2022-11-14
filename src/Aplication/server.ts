import "dotenv/config"
import express from "express";
import { PORT } from "./ENV"



const app = express();

app.listen(
  PORT,
  () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  }
);