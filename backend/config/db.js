import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://poojakhawle:poojakhawle@cluster0.vpvreil.mongodb.net/food-order-app").then(()=>
    console.log("MongoDB Connected ✅"));
  } catch (error) {
    console.log("MongoDB Error ❌", error);
  }
};

export default connectDB;
