import { memo } from 'react';
import './FoodDisplay.css';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>

      <h2>Food Near You</h2>
    </div>
  );
};

export default memo(FoodDisplay);