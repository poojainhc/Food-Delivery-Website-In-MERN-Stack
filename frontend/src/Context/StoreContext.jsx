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

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems])


    const Contextvalue = {
        food_list: food_list,
        removeFromCart,
        addToCart,
        cartItems,
        setCartItems,
        
    }
    return (
        <StoreContext.Provider value={Contextvalue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;