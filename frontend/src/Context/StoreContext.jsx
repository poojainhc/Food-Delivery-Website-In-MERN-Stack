import axios from "axios";
import { createContext, useEffect } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
export const StoreContext = createContext(null)
import { useState } from "react";

const StoreContextProvider  = (props) => {

    const [cartItems, setCartItems] = useState({})
    const [token, setToken] = useState("")
    const [ food_list, setFood_list] = useState([])
    const url = "http://localhost:4000"
       
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
            const ItemInfo = food_list.find(
            (product) => product._id.toString() === item
            );   
         totalAmount += ItemInfo.price * cartItems[item];
        }
    }
    return totalAmount;
   }

  // Get food listfrom DB

    const fetchFoodList = async () => {
    try {
        const response = await axios.get(url + "/api/food/foodlist");

        if (response.data.success) {
        setFood_list(response.data.data);
        } else {
        console.log("Error fetching food list");
        }

    } catch (error) {
        console.log(error);
    }
    };

    useEffect(() => {
    async function loadData() {
        await fetchFoodList();

        const savedToken = localStorage.getItem("token");
        if (savedToken) {
        setToken(savedToken);
        }
    }

    loadData();
    }, []);

    const Contextvalue = {
        food_list: food_list,
        removeFromCart,
        addToCart,
        cartItems,
        setCartItems,
        getTotalCartAmount, 
        url,
        token, 
        setToken,
    }
    return (
        <StoreContext.Provider value={Contextvalue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;