import { memo } from 'react';
import './FoodDisplay.css';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import Fooditem from '../Fooditem/Fooditem';

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>

      <h2>Food Near You</h2>
      <div className='food-display-list'>
        {food_list.map((item,index) => {
          
         return <Fooditem
            key={item.id}
            id={item._id}
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
            />
           }
          
        )}
      </div>
    </div>
  );
};

export default memo(FoodDisplay);