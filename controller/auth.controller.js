import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";
import createError from "../utils/createError.js";


export const register = async(req,res,next)=>{
      

    try{
        const user = await User.findOne({username:req.body.username});
        if(user) return next(createError(400,"User is already with name!"));
        
        const hash = bcrypt.hashSync(req.body.password,5);// it will encrpt password 
        const newUser = new User({
            ...req.body,
            password:hash,
        });

        await newUser.save();
        res.status(201).send("User has been created ");
    }

    catch(err){
        next(err);
    }
}


export const login = async(req,res,next )=>{
    try{
        const user = await User.findOne({username:req.body.username});
    
        if(!user) return next(createError(404,"User not found !"));

       // test the password 

    const isCorrect = bcrypt.compareSync(req.body.password,user.password); // here we are compare password 
    if(!isCorrect) return next(createError(404,"Wrong password or username "));
    const token = jwt.sign({
        id:user._id,
        isSeller:user.isSeller,
    },
    process.env.JWT_KEY
    );
    const {password,...info} = user._doc;   //_doc it will return the data in well format 
    res.cookie("accessToken",token,{
        httpOnly:true,
        sameSite:process.env.NODE_ENV === "Development" ? "lax":"none",
        secure: process.env.NODE_ENV === "Development" ? false: true
    }).status(200).send(info);
    }  
    catch(err){
        next(err)
    }
}

export const logout = async(req,res)=>{
   
        res
        .clearCookie("accessToken",{
            sameSite:process.env.NODE_ENV === "Development" ? "lax":"none",
            secure: process.env.NODE_ENV === "Development" ? false: true
        })
        .status(200)
        .send("user has been logged out.");
}
