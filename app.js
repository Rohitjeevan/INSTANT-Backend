import express from "express"
import { config } from "dotenv";
import userRoute from "./route/user.route.js";
import conversationRoute from "./route/conversation.route.js";
import gigRoute from "./route/gig.route.js"
import messageRoute from "./route/message.route.js";
import orderRoute from "./route/order.route.js";
import reviewRoute from "./route/review.route.js"
import authRoute from "./route/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

config({
    path:"./Data/config.env",
})

const corsOrigin ={
    origin: process.env.FRONTEND_URL, //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));

// express.json() :- means that we allow the take from body in the form of json object 
app.use(express.json());

// The cookie-parser is a middleware for handling HTTP cookies in Node.js and Express.js applications. It parses the cookies attached to incoming requests, makes them available in a convenient format, and enables easy manipulation of cookies in the server-side code.
app.use(cookieParser())

app.use(cors({origin:process.env.FRONTEND_URL,credential:true}));
 


app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/gigs",gigRoute);
app.use("/api/orders",orderRoute);
app.use("/api/conversations",conversationRoute);
app.use("/api/messages",messageRoute);
app.use("/api/reviews",reviewRoute);


//controlling the error 

app.use((err,req,res,next)=>{
   const errorStatus = err.status || 500;
   const errorMessage = err.message || "something went wrong" ;
   return res.status(errorStatus).send(errorMessage);
})

export default app;