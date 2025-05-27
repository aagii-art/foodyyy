import crypto from "crypto";
import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import  jwt  from "jsonwebtoken";

  export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({ verifyToken : token });

    if (!user) {
       res.status(404).send("Invalid token or user not foundddd"); return;
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    await user.save();

    res.redirect("http://localhost:3001/emailVerified");
  } catch (error) {
    res.status(500).send("Server error during email verification");
  }
};

export const verifyToken = async ( req : Request, res : Response ) => {

   try {
      const irjigaHeader = req.headers.authorization;
      console.log(irjigaHeader);
      
      if( !irjigaHeader || !irjigaHeader.startsWith("Bearer ") ){
       res.status(401).json({ valid : false, msg: "Token not provided" }); return;
      }
      const token = irjigaHeader.split(" ")[1];
      
      const decoded = jwt.verify(token, process.env.jwtt as string ) as { id : string;  } ;
      console.log( " this is decoded : ",  decoded );
      
      const existingUser = await User.findById(decoded.id);
      if (!existingUser) {
       res.status(401).json({ valid: false }); return;
      }

      res.status(200).json({ valid: true });

   } catch (error) {
         res.status(401).json({ valid: false, msg: "Invalid or expired token" });
   }
}

export const forgotPassword = async ( req : Request, res : Response ) => {
    const { email } = req.body;
    if (!email) {
       res.status(400).json({ message: "Email is required" });
       return;
    }
    const user = await User.findOne({ email });
    if (!user) {
       res.status(404).json({ message: "user not found" });
       return;
    }
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
         service : "gmail",
         auth : {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
      }
   });
   const mailOptions = {
         from : process.env.EMAIL_USER,         
         to : user.email,                       
         subject : "Password Reset",         
         html : ` <a href="http://localhost:3001/loginSection?token=${token}" > reset password </a>  `, 
   };
    await transporter.sendMail(mailOptions);
    res.status(200).json({
        message: "reset link sent your gmail ",
    });
} 

export const resetPassword = async ( req : Request, res : Response ) => {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
    res.status(400).json({ message: "Token and new password are required" });
    return;
    }    
    const user = await User.findOne( {
        resetPasswordToken : token,
        resetPasswordExpires : { $gt  : Date.now() } 
    })
    if (!user) {
       res.status(400).json({ message: "Token is invalid or has expired" }); return; 
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({ message: " password successfully updated " });
} 