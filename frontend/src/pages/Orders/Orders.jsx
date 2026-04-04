import { memo, use } from 'react';
import './Orders.css';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import React, { useState} from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {

  const{getTotalCartAmount,token,food_list, cartItems,url} = useContext(StoreContext);
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const placeOrder = async(event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }

    try {
      // console.log("Placing order to:", url+"/api/order/place", { token });
      const response = await axios.post(url+"/api/order/place", orderData , { headers: { token } });
      if(response.data.success){
        const {session_url} = response.data;
        window.location.replace(session_url);
      } else {
        console.error("Order API returned error:", response.data);
        alert("Error placing order. Please try again.")
      }
    } catch (err) {
      console.error("Order request failed:", err);
      alert("Failed to place order. Check console and try again.");
    }
  }

  const onChangehandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }
 
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/cart');
    }else if(getTotalCartAmount() === 0){
      navigate('/cart');
    }

  }, [token])
 
  return (
    <form  onSubmit={placeOrder} className='place-order' >
      <div className='place-order-left'>
        <p className="title">Delivery information</p>
        <div className='multi-fileds'>
          <input required name='firstName' value={data.firstName} type="text" placeholder='First name' onChange={onChangehandler} />
          <input required name='lastName' value={data.lastName} type="text" placeholder='Last name' onChange={onChangehandler} />
        </div>
       <div className='multi-fileds'>
         <input required name='email' value={data.email} type="text" placeholder='Email' onChange={onChangehandler} />
        <input required name='street' value={data.street} type="text" placeholder='Street address' onChange={onChangehandler} />
       </div>
       <div className='multi-fileds'>
         <input required name='city' value={data.city} type="text" placeholder='City' onChange={onChangehandler} />
        <input required name='state' value={data.state} type="text" placeholder='State' onChange={onChangehandler} />
       </div>
       <div className='multi-fileds'>
         <input required name='zipcode' value={data.zipcode} type="text" placeholder='Zip code' onChange={onChangehandler} />
        <input required name='country' value={data.country} type="text" placeholder='Country' onChange={onChangehandler} />
       </div>
       <div className='multi-fileds'>
         <input required name='phone' value={data.phone} type="text" placeholder='Phone number' onChange={onChangehandler} />
       </div>
      </div>
      <div className='place-order-right'>
        
         <div className='cart-total'>
           <h2>Cart Total</h2>
          <div className="cart-total-details">
          <p>Subtotal</p>
          <p>${getTotalCartAmount().toFixed(2)}</p>
        </div>
        <hr/>
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>${2}</p>
        </div>
        <hr/>
        <div className="cart-total-details">
          <p>Total</p>
          <p>${(getTotalCartAmount() + 2).toFixed(2)}</p>
        </div>
        <button className='pay-btn'>Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default memo(Orders);