import { createContext, useEffect, useState }from "react";

const addCartItem = (cartItems,productToAdd) => {

    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    )

    if(existingCartItem)
    {
        return cartItems.map(cartItem => 
                cartItem.id === productToAdd.id ?
                {...cartItem, quantity : cartItem.quantity + 1} 
                : cartItem
            )
    }

    return [...cartItems,{...productToAdd, quantity : 1}]
}

const removeCartItem = (cartItems,productToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    )

    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
    }

    return cartItems.map(cartItem => 
        cartItem.id === productToRemove.id ?
        {...cartItem, quantity : cartItem.quantity - 1} 
        : cartItem
    )
}

const clearCartItem = (cartItems,clearItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== clearItemToClear.id)
}


export const CartContext = createContext({
    isCartOpen : 'false',
    setIsCartOpen : () => {},
    cartItems : [],
    addItemsToCart : () => {},
    cartCount : 0,
    clearItemFromCart: ()=> {},
    cartTotal: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen,setIsCartOpen] = useState()
    const [cartItems,setCartItems] = useState([])
    const [cartCount,setCartCount] = useState(0)
    const [cartTotal,setCartTotal] = useState(0)

    

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total,cartItem)=> total + cartItem.quantity,0)
        setCartCount(newCartCount)
    },[cartItems])

    useEffect(()=>{
        const newCartTotal = cartItems.reduce((total,cartItem)=> total + cartItem.quantity * cartItem.price,0)
        setCartTotal(newCartTotal)
    },[cartItems])



    const addItemsToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd)        
        )
    }

    const removeItemToCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems,productToRemove)        
        )
    }
    
    const clearItemFromCart = (clearItemToClear) => {
        setCartItems(clearCartItem(cartItems,clearItemToClear)        
        )
    }

    const value = {isCartOpen,setIsCartOpen , addItemsToCart, removeItemToCart, clearItemFromCart , cartItems ,cartCount, cartTotal}
    return(<CartContext.Provider value={value}>{children}</CartContext.Provider>)
}