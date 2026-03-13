import React from 'react'
import './Fooditem.css'
import { assets } from '../../assets/frontend_assets/assets'

const Fooditem = ({id, name, price, description, image}) => {
  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img className="food-item-image" src={image} alt={name} />
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