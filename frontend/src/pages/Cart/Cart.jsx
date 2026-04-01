import { memo, useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext'
import React from 'react';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const navigate = useNavigate();
  const {cartItems, food_list, removeFromCart,getTotalCartAmount,url} = useContext(StoreContext);
  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Qty</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {food_list.map((item, index) =>{ 
        if(cartItems[item._id] > 0){
        return (
          <div>
          <div key={index} className='cart-items-title cart-items-item'>
            <img src={url+"/images/"+item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>${item.price}</p>
            <p>{cartItems[item._id]}</p>
            <p>${item.price*cartItems[item._id]}</p>
            <button onClick={() => removeFromCart(item._id)}>x</button>
          </div>
          <hr/>
          </div>
    )}})}
      </div>
      <div className='cart-bottom'>
        
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div className="cart-total-details">
          <p>Subtotal</p>
          <p>${getTotalCartAmount().toFixed(2)}</p>
        </div>
        <hr/>
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>${getTotalCartAmount()===0?0:2}</p>
        </div>
        <hr/>
        <div className="cart-total-details">
          <p>Total</p>
          <p>${(getTotalCartAmount() + (getTotalCartAmount()===0?0:2)).toFixed(2)}</p>
        </div>
        <button onClick={() => navigate('/orders')} className='checkout-btn'>Proceed to Checkout</button>
        </div>
         <div className='cart-promocode'>
        <p>Have a promocode?</p>
       <div className='cart-promocode-input'>
        <input type="text" placeholder='Enter your promocode' />
        <button className='apply-btn'>Apply</button>
       </div>
      </div>
      </div>
     
    </div>
  );
};

export default memo(Cart);