import express from "express";
import { config } from "dotenv";
import { dbConnection } from "./dbConnection/dbConnection.js";
import cors from "cors";
import taskRouter from "./Routers/taskRouters.js";
import mentorRouter from "./Routers/MentorRouter.js";

const app=express();

config({path:"./.env"});
app.use(cors());
app.use(express.json());

dbConnection();

app.use("/api/v1.2/student",taskRouter);
app.use("/api/v1.2/mentor",mentorRouter);

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`server is runing on port:${port}`);
})