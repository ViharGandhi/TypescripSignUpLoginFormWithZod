import express from  "express"
import dotenv from "dotenv"
import { Request,Response } from "express";
import userRouter from "./Routes/User";
import cors from "cors"
import connectDB from "./Database/Connection";
import appRouter from "./Routes/App"


const app = express();
app.use(express.json());
app.use(cors())
dotenv.config();
const PORT = process.env.PORT
connectDB()
app.use("/auth",userRouter)
app.use("/home",appRouter)
app.listen(PORT,()=>{
    console.log("App running on PORT 3000")
})