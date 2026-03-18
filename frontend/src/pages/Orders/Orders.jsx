import { memo } from 'react';
import './Orders.css';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';

const Orders = () => {

  const{getTotalCartAmount} = useContext(StoreContext);
  return (
    <div className='place-order'>
      <div className='place-order-left'>
        <p className="title">Delivery information</p>
        <div className='multi-fileds'>
          <input type="text" placeholder='First name' />
          <input type="text" placeholder='Last name' />
        </div>
       <div className='multi-fileds'>
         <input type="text" placeholder='Email' />
        <input type="text" placeholder='Street address' />
       </div>
       <div className='multi-fileds'>
         <input type="text" placeholder='City' />
        <input type="text" placeholder='State' />
       </div>
       <div className='multi-fileds'>
         <input type="text" placeholder='Zip code' />
        <input type="text" placeholder='Country' />
       </div>
       <div className='multi-fileds'>
         <input type="text" placeholder='Phone number' />
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
     
    </div>
  );
};

export default memo(Orders);