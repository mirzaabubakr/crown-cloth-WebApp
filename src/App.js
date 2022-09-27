import { Route, Routes } from "react-router-dom"
import Home from "./components/routes/home/home.component"
import Navigation from "./components/routes/Nevigation/navigation.component"
import Authentication from "./components/authentication/authentication.component"
import Shop from "./components/routes/shop/shop.component"
import Checkout from "./components/routes/checkout/checkout.components"
import React from "react"
import { useEffect } from "react"

const App = () => {
  useEffect(() => {
    document.title = "Crown Clothing Store"
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App
