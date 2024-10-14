import mongoose,{Schema}  from "mongoose";

const Userschema:Schema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})

export const Usermodel =  mongoose.model("Usermodel",Userschema)