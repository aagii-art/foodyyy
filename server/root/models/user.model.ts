import mongoose, { Schema, Document } from "mongoose";

interface typeUser extends Document {
  name: string;
  email: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: number;
  verifyToken? :  string;
  isVerified : boolean;
  role: "user" | "admin";
}

const UserSchema = new Schema<typeUser>(
    {
        name : { type : String, required : true },
        email : { type : String, required : true, unique : true },
        password : { type : String, required : true,  },
        resetPasswordToken : { type : String },
        resetPasswordExpires : { type : Number },
        verifyToken: { type: String },
        isVerified: { type: Boolean, default: false },
        role  : { type : String, enum : [ "user", "admin" ], default  : "user"  }
    },
    { timestamps  : true }
);
const User = mongoose.model<typeUser>("U", UserSchema );
export default User;