import Button from '../button/button.component'
import './cart-dropdown.styles.scss'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import CartItems from '../cart-item/cart-items.component'

export const CartDropDown = () => {

    const nevigator = useNavigate()

    const goTOCheckoutHandeler = () => {
        nevigator('/checkout')
    }

    const {cartItems} = useContext(CartContext)
    return(
        <div className="cart-dropdown-container">
            <div className="cart-items"> 
                {cartItems.map((items,index) => <CartItems key={index} items={items}/>)}
            </div>
            <Button onClick={goTOCheckoutHandeler}>CHECKOUT</Button>
        </div>
    )
}

export default CartDropDown