import './product-card.styles.scss'

import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'


import Button from '../button/button.component'

const ProductCard = ({product}) => {
    const {name,price, imageUrl} = product
    const {addItemsToCart} = useContext(CartContext)

    const addProductsToCart = () => addItemsToCart(product)

    return(
         <div className='product-card-container'>
             <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                 <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>

         <Button buttonType='inverted' onClick={addProductsToCart}>ADD TO CART</Button>

     </div>
 )
}

export default ProductCard