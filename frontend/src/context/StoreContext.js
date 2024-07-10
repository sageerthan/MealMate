import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

export const StoreContext = createContext(null)

export const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = 'http://localhost:8000';
    const [token, setToken] = useState('');
    const [foodList, setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(`${url}/api/v1/addcart`, { itemId }, { headers: { token } })
        }
    }

    const reduceFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(`${url}/api/v1/reducecart`, { itemId }, { headers: { token } })
        }
    }
    const removeComplete = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: 0 }))
        if (token) {
            await axios.delete(`${url}/api/v1/removecart`, { itemId }, { headers: { token } })
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = foodList.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(`${url}/api/v1/getfoods`);
        setFoodList(response.data.foods);
    }

    const loadCartData=async(token)=>{
        const response=await axios.post(`${url}/api/v1/getcart`,{},{headers:{token}});
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem('token'))
            }
        }
        loadData();
    }, [])

    const contextValue = {
        foodList,
        cartItems,
        setCartItems,
        addToCart,
        reduceFromCart,
        removeComplete,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
