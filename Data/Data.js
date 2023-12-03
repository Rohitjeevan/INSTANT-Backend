import mongoose  from "mongoose";

export const connectDB =()=>{
    
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"INSTANT",
        useNewUrlParser: true,
        useUnifiedTopology: true  
    })
    .then((c) => console.log(`Database is connected with ${c.connection.host}`))
    .catch((e) => console.log(e))
}