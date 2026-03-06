const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path'); 

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("./public"))

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    
}))
const authRouter = require('./routes/auth.routes');
const userRouter = require("./routes/user.routes");
const songRouter = require('./routes/song.routes');

app.use('/api/auth',authRouter);

app.use('/api/user',userRouter);

app.use('/api/song',songRouter);

app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"));
})


module.exports = app;