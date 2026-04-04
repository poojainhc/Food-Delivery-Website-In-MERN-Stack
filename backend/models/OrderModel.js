import mongoosh from 'mongoose';

const orderSchema = new mongoosh.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"pending"},
    date:{type:Date,default:Date.now()},
    payment:{type:Object,required:true,default:false}
})

const OrderModel = mongoosh.models.order|| mongoosh.model("orders",orderSchema);

export default OrderModel;