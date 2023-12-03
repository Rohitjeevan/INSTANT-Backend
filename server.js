import app from "./app.js";


import { connectDB } from "./Data/Data.js";


connectDB();

app.get("/",(req,res) =>{
    res.send("<h1> Hi I am Server <h1/> ")
})

app.listen(process.env.PORT,(req,res)=>{
    console.log(`server is running on port http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} MODE`);
})
