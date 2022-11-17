import "dotenv/config";
import express from "express";

import { PORT } from "./Shared/Utils/ENV"
import { userRouter } from "./Adapter/RestAPI/userRouter";

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.get("/", (request, response) => {
  return response.send("jhon");
})

app.listen(
  PORT,
  () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  }
);