import { Fragment, useContext } from "react"
import { Link, Outlet } from "react-router-dom"
import { ReactComponent as CrwnLogo } from "../../../assets/crown.svg"

import { CartContext } from "../../../context/cart.context"


import { UserContext } from "../../../context/user.context"
import { signOutUser } from "../../../utils/firebase/firebase.utils"

import CartDropDown from "../../cart drop down/cart-dropdown.components"
import CartIcon from "../../carticon/cart-icon.components"

import '../Nevigation/navigation.styles.scss'


const Navigation = () => {

    const { currentUser } = useContext(UserContext)
    const { isCartOpen }  = useContext(CartContext)


    return (
      <Fragment>
        <div className="navigation">
          
          <Link className="logo-container" to={'/'}>
              <CrwnLogo/>
          </Link>

          <div className="nav-links-container">
              <Link className="nav-link" to={'/shop'}>
                  <div>SHOP</div>
              </Link>

              {
                currentUser ? (
                  <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                ): (
                <Link className="nav-link" to={'/auth'}>
                  <div>SIGN IN</div>
                </Link>
                )
              }
              <CartIcon />
          </div>
          {isCartOpen && <CartDropDown />}        
        </div>
        <Outlet />
      </Fragment>
    )
  }

export default Navigation