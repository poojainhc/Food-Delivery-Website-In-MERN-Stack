import express from "express";
import authMiddelware from "../middelware/auth.js";
import { placeOrder,verifyOrder,userOrders} from "../controllers/OrderController.js";

import OrderModel from "../models/OrderModel.js";

const orderRouter = express.Router();

orderRouter.post("/place",authMiddelware, placeOrder)
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders",authMiddelware, userOrders);

export default orderRouter;