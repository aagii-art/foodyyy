import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer"; 

export const createUser = async ( req : Request, res : Response ) => {
   try {
    const verifyToken = crypto.randomBytes(32).toString("hex");

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
       res.status(400).json({ message: "All fields are required" });
       return;
    }

    const existUser = await User.findOne( { email } );
     if (existUser) {
       res.status(400).json({ message: "Email already exists" });
       return;
    }

    const hashedPassword = await bcrypt.hash( password, 10 );
    const newUser = new User({ name, email, password : hashedPassword, verifyToken, isVerified : false });
    await newUser.save();

    const verificationLink = `http://localhost:3000/api/users/verify-email?token=${verifyToken}`;
    const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
          },
    });
    const mailOptions = {
              from: process.env.EMAIL_USER,
              to: email,
              subject: "Verify your email",
              html: `<p> click below link to verify your email :) </p> <a href="${verificationLink}">${verificationLink}</a>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).send("user created. Check gmail to verify your email ");
   } catch (error) {
         res.status(500).json({ message: "Server error shuu ", error });
   }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(401).json({ message: "Invalid email" });
      return;
    }
    if (!existingUser.isVerified) {
       res.status(401).json({ message: "Please verify your email before logging in" });
       return;
    }

    const checkPassword = await bcrypt.compare( password, existingUser.password );
    if( !checkPassword ){ res.send("invalid password"); return; }
    
    const token = jwt.sign(
      { id : existingUser._id },
      process.env.JWT_KEY as string,
      { expiresIn : "1h" }
    );

    res.status(200).json({ message: "Login successful", user : existingUser, "login-token": token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
