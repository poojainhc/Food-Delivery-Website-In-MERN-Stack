import { createContext, useEffect } from "react";
import { food_list } from "../assets/frontend_assets/assets";
export const StoreContext = createContext(null)
import { useState } from "react";

const StoreContextProvider  = (props) => {

    const [cartItems, setCartItems] = useState({})
       
    const addToCart = (itemID) => {
            if(!cartItems[itemID]) {
                setCartItems((prev )=> ({...prev, [itemID]:1 }))
            } else {
                setCartItems ((prev )=> ({...prev, [itemID]: prev[itemID] + 1 }))
            }
        }

    const removeFromCart = (itemID) => {  
        setCartItems ((prev )=> ({...prev, [itemID]: prev[itemID] - 1 }))
    } 

   const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      
        if (cartItems[item] > 0) {
            const ItemInfo = food_list.find((product) => product._id === item);
            totalAmount += ItemInfo.price * cartItems[item];
        }
    }
    return totalAmount;
   }


    const Contextvalue = {
        food_list: food_list,
        removeFromCart,
        addToCart,
        cartItems,
        setCartItems,
        getTotalCartAmount, 
    }
    return (
        <StoreContext.Provider value={Contextvalue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;