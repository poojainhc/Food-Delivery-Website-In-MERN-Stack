import axios from "axios";
import { createContext, useEffect } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
export const StoreContext = createContext(null)
import { useState } from "react";

const StoreContextProvider  = (props) => {

    const [cartItems, setCartItems] = useState({})
    const [token, setToken] = useState("")
    const [ food_list, setFood_list] = useState([])
    const url = "https://food-delivery-website-in-mern-stack-production.up.railway.app/"
       
    const addToCart = async(itemID) => {
            if(!cartItems[itemID]) {
                setCartItems((prev )=> ({...prev, [itemID]:1 }))
            } else {
                setCartItems ((prev )=> ({...prev, [itemID]: prev[itemID] + 1 }))
            }
            if(token){
                try {
                  await axios.post(url+"/api/cart/add", { itemId: itemID }, { headers: { token } })
                } catch (err) {
                  console.error("Failed to add to server cart:", err)
                }
            } else {
              // keep guest cart in localStorage
              localStorage.setItem("cartItems", JSON.stringify({...cartItems, [itemID]: (cartItems[itemID]||0) + 1}))
            }
    }

        const removeFromCart = async(itemID) => {  
                setCartItems ((prev )=> ({...prev, [itemID]: Math.max((prev[itemID]||0) - 1, 0) }));
                if(token){
                        try {
                            await axios.post(url+"/api/cart/remove", { itemId: itemID }, { headers: { token } })
                        } catch (err) {
                            console.error("Failed to remove from server cart:", err)
                        }
                } else {
                    localStorage.setItem("cartItems", JSON.stringify({...cartItems, [itemID]: Math.max((cartItems[itemID]||0) - 1, 0)}))
                }
        } 

   const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      
        if (cartItems[item] > 0) {
            const ItemInfo = food_list.find(
            (product) => product._id.toString() === item
            );
         if (ItemInfo) totalAmount += ItemInfo.price * cartItems[item];
        }
    }
    return totalAmount;
   }

  // Get food listfrom DB

  const fetchFoodList =async()=>{
    const response = await axios.get(url+"/api/food/foodlist");
    setFood_list(response.data.data)
  }

    const loadCartData = async (passedToken) => {
        const currentToken = passedToken ?? token ?? localStorage.getItem("token");
        if (currentToken) {
            try {
                const response = await axios.get(url + "/api/cart/get", { headers: { token: currentToken } });
                setCartItems(response?.data?.cartData || {});
            } catch (err) {
                console.error("Failed to load cart from server:", err);
            }
        } else {
            const local = localStorage.getItem("cartItems");
            if (local) setCartItems(JSON.parse(local));
        }
    };

   useEffect(()=>{
    
        async function loadData() {
                await fetchFoodList();
                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                    setToken(storedToken);
                    await loadCartData(storedToken);
                } else {
                    await loadCartData(null);
                }
        }
    loadData();

   },[])

    // persist guest cart to localStorage when not logged in
    useEffect(() => {
        if (!token) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        } else {
            localStorage.removeItem("cartItems");
        }
    }, [cartItems, token]);


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