 import express from "express"
 import cors from "cors"
 import connectDB from "./config/db.js"
 import foodRouter from "./routes/foodRoute.js";
 import userRouter from "./routes/userRoute.js";
 import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

 //app config

 const app = express();
 const port =4000

 //middelware
 app.use(express.json())
 app.use(cors())

// simple request logger to help debug routing/issues
app.use((req, res, next) => {
   console.log(new Date().toISOString(), req.method, req.originalUrl);
   next();
});

 //db config

 connectDB();

 //api endpoint

 app.use("/api/food",foodRouter)
 app.use("/images", express.static("uploads"))
 app.use("/api/user",userRouter)
 app.use("/api/cart",cartRouter)
 app.use("/api/order",orderRouter)

// quick health/test endpoint for order route
app.get("/api/order/test", (req, res) => {
   res.json({ success: true, message: "order route reachable" });
});

 app.get("/",(req,res)=>{
    res.send("api working")
 })

 app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
 })