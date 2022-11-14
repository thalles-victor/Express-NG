import "dotenv/config";
import express from "express";

import { PORT } from "./Shared/Utils/ENV"
import { userRouter } from "./Adapter/RestAPI/userRouter";

const app = express();

app.use(userRouter);

app.listen(
  PORT,
  () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  }
);