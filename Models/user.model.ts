import mongoose, { Document, Schema, model } from "mongoose";

interface userData {
  name: string;
  email: string;
  password: string;
  stack: string;
  isAdmin: boolean;
}

interface user extends userData, Document {}

const userSchema = new Schema<userData>(
  {
    name: {
      type: String,
      required: [true, "please enter your fullname"],
    },
    email: {
      type: String,
      required: [true, "please enter an email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "please enter a password"],
      minlength: 6,
    },
    stack: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userModel = model<user>("userDetails", userSchema);

export default userModel;
