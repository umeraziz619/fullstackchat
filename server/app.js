import express from 'express'
const app = express();
import userRoute from './routes/user.js'
// import userRoute from './routes/user';

app.use("/users",userRoute)
app.get("/",(req,res)=>{
    res.send("Hello world home")
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})