import { createContext, useState } from "react";

import PRODUCTS from '../../src/shop-data.json'

export const ProductsContext = createContext({
    Products : []
})

export const ProductProvider = ({children}) => {
    const [products,setProducts] = useState(PRODUCTS)
    const value = {products}
    return(
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}