


import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
    console.log("BODY:", req.body);
console.log("FILE:", req.file);
  try {
    // check image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    let image_filename = req.file.filename;
console.log(req.file);
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description, // ✅ fixed
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();

    res.status(200).json({
      success: true,
      message: "Food added successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error adding food",
    });
  }
};

//all food list

const listFood =async(req,res)=>{
  try {
    const foods = await foodModel.find({})
    res.json({success:true,data:foods})
    
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"error"})
  }
}

export { addFood,listFood };