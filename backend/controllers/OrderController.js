import OrderModel from "../models/OrderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"
import 'dotenv/config'
import { response } from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order for frontend

const placeOrder = async(req,res)=>{
  const frontend_url = "http://localhost:5173";
  
  try {
    const newOrder = new OrderModel({
        userId:req.userId,
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.address,
    })
    await newOrder.save()
    // Do NOT empty the user's cart here — wait until payment succeeds.
   await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    const line_items = req.body.items.map((item)=>({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price *100*80
      },
      quantity: item.quantity
    }))
 
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: 2*100*80
      },
      quantity: 1
    })

   const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    })
    res.json({ success: true, session_url:session.url})
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Error occurred while processing the order." })
  }
}

const verifyOrder = async (req, res) => {
  const { success, orderId } = req.body;

  try {
    
    if (success=== "true") {
      // payment succeeded: mark order payment true and clear user's cart
     await OrderModel.findByIdAndUpdate(orderId, { payment: true });
     res.json({ success: true, message: "Payment Successful" })
    }
    else{
        // payment failed or cancelled: delete the provisional order, do NOT empty cart
        await OrderModel.findByIdAndDelete(orderId);
        res.json({ success: false, message: "Payment Failed or Cancelled. Order removed." })
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

//user ordersforfrontend 

const userOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.userId });

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error fetching orders"
    });
  }
};

export {placeOrder,verifyOrder,userOrders};