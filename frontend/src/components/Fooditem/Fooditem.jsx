import React from 'react'
import './Fooditem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'

const Fooditem = ({id, name, price, description, image}) => {
console.log(image)
  const{ removeFromCart,addToCart,cartItems,url}= useContext(StoreContext)


  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img className="food-item-image" src={url+"/images/"+image} alt={name} />
        {
        !cartItems[id]
        ? <img className="add" onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" /> : 
        <div className="food-item-counter">
          <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
          <p>{cartItems[id]}</p>
          <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add" />
        </div>
        }
    
      </div>
      <div className="food-item-info">
        <div className='food-item-rating'>
         <p>{name}</p>
         <img src={assets.rating_starts} alt={name} />
         </div>
          <p className='food-item-description'>{description}</p>
        <p className='food-item-price'>${price}</p>
        </div>
       
      </div>
   
  )
}

export default Fooditem