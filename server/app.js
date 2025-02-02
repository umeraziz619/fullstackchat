import express from 'express'
const app = express();
import { connectDb } from './utils/features.js';
import dotenv from 'dotenv'
import { errorMiddleware } from './middlewares/error.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.js'
import chatRoute from './routes/chat.js'
dotenv.config({
    path:'./.env'
})
connectDb(process.env.MONGO_URL)

app.use(express.json());
app.use(cookieParser())
// app.use(express.urlencoded())
// import userRoute from './routes/user';

app.use("/user",userRoute)
app.use("/chat",chatRoute)
app.get("/",(req,res)=>{
    res.send("Hello world home")
})

app.use(errorMiddleware)
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})