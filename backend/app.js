const express=require('express')
const app=express()
const cors=require('cors')
const session=require('express-session')
const mongoose=require('mongoose')
const PORT=3000;
const DB_PATH = "mongodb+srv://ranaahmadali860:ranaahmadali860@cluster0.wegqf6w.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";
const route=require('../backend/Routes/AuthRoute')

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

app.use(cors({
  origin: 'http://localhost:5173',  // Your frontend origin
  credentials: true                // Allow cookies/sessions
}));

app.use(session({
    secret:'carrental',
    resave:false,
    saveUninitialized:false,
    cookie:{
        httpOnly:true,
        secure:false,
        maxAge:1000*60*60*24
    }
}))
app.use(route)

mongoose.connect(DB_PATH).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Port Running at: http://localhost:${PORT}`)
    })
}).catch((error)=>{
    console.log("Failed to Connect",error)
})