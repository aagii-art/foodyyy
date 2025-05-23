import crypto from "crypto";
import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const verifyEmail = async ( req : Request, res : Response ) => {
   const { token } = req.query;
   if( !token ){
     res.status(400).json({ message: "Invalid token" });
     return;
   }
   const user = await User.findOne( { verifyToken : token } );
    if (!user) {
       res.status(404).json({ message: "User not found" });
       return;
    }
    user.isVerified = true;
    user.verifyToken = undefined; 
    await user.save();
    res.status(200).json({ message: "Email successfully verified" });
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
         text : `Here is your reset link: http://localhost:3000/api/users/reset-password?token=${token}`, 
   };
    await transporter.sendMail(mailOptions);
    res.status(200).json({
        message: "reset link sent",
        user
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