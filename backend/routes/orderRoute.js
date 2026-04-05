import express from "express";
import authMiddelware from "../middelware/auth.js";
import { placeOrder,verifyOrder,userOrders,listOrders,updateOrderStatus} from "../controllers/OrderController.js";

import OrderModel from "../models/OrderModel.js";

const orderRouter = express.Router();

orderRouter.post("/place",authMiddelware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders",authMiddelware, userOrders);
orderRouter.get("/list", listOrders) ;
// accept POST as well for clients that send POST instead of PUT
orderRouter.post("/update-status", updateOrderStatus);


export default orderRouter;