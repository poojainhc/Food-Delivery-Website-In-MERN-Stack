import { response } from "express";
import  jwt  from "jsonwebtoken";

const authMiddelware = async(req,res,next)=>{
  const token = req.headers.token;
  if(!token){
    return res.json({success:false, message:"Not autorized login again"})
  }
  try {
    const token_decode = jwt.verify(token,process.env.JWT_SECRET);
    req.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error)
    return res.json({success:false, message:"Error"})
    
  }
} 
export default authMiddelware;