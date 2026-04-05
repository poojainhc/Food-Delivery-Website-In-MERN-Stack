import React, { useEffect, useState } from 'react';
import "./Order.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets.js'

const Order = ({ url }) => {
  const [order, setOrder] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");

      if (response.data.success) {
        setOrder(response.data.data);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.post(url + "/api/order/update-status", { orderId, status });
      if (response.data.success) {
        toast.success("Order status updated");
        fetchAllOrders(); // Refresh the order list after updating status
      } else {
        toast.error(response.data.message);
      }} catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }};

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  return (
    <div className='order-add'>
      <div className="order-items">
         <h2>Order</h2>
        {order.map((order,index) => (
          <div key={index} className="order-item">

            <img src={assets.parcel_icon} alt="" />
           <div>
            <p className='order-item-food'>
              {order.items.map((item, index) => {
                        if(index===order.items.length-1){
                            return item.name+" x "+item.quantity
                        } else {
                            return item.name+" x "+item.quantity+", "
                        }
                    })}
                </p>
              
            <p className='order-item-name'>
              {order.address.firstName + " " + order.address.lastName}
            </p>
             <div className='order-item-address'>
              <p>{order.address.street + ", "}</p>
               <p>{order.address.city + ", " + order.address.state + ", " + order.address.zipcode + ", " + order.address.country}</p>
             <p className='order-item-phone'>{order.address.phone}</p>

             </div>
          </div>
          
             <p>Items:{order.items.length}</p>
             <p className='order-item-amount'>${order.amount}.00</p>
             <p>
              <select value={order.status} onChange={(e) => updateOrderStatus(order._id, e.target.value)}>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
             </select>
             </p>
             
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;