import express from 'express';
import dotenv from 'dotenv'
import connectToMongoDB from './database/db.js';
import userRouter from './routers/user.route.js';
import blogRouter from './routers/blog.route.js';
import commentRouter from './routers/comment.route.js';
import cors from 'cors'
import cookieParser from "cookie-parser";
import path from 'path'

dotenv.config()
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

const _dirname = path.resolve()
app.use("/api", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/comment", commentRouter);
app.use(express.static(path.join(_dirname, "frontend/dist")))
// app.get("*", (_, res)=>{
//     res.sendFile(path.resolve(_dirname, "frontend", "dist", "intex.html"))
// })
const PORT = process.env.PORT || 5000;
connectToMongoDB()
app.listen(PORT, () => { 
 console.log(`Server is running at port ${PORT}`)
})