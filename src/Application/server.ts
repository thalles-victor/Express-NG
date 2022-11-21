import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { PORT } from "./Shared/Utils/ENV"
import { userRouter } from "./Adapter/RestAPI/userRouter";
import { join } from "path";

const app = express();
app.use(cors())

app.use(express.json({limit: "50mb" }))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))


app.use("/user", userRouter);

app.get("/", (request, response) => {
  return response.send("Server is running");
});

app.get("/pdf", (request, response) => {
  return response.sendFile(join(__dirname, "Generated.pdf"))
})

app.listen(
  PORT,
  () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  }
);