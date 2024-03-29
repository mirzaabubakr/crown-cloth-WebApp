import './cart-item.styles.scss'



const CartItems = ({items}) => {
    const {name,imageUrl,price,quantity} = items
    return(
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>{quantity} x ${price}</span>
            </div>
        </div>
    )
}

export default CartItems