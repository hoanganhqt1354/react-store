import React from 'react'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import {
  Navbar,
  Sidebar,
  Footer,
  AuthSync
} from './components'

import {
  Home,
  About,
  Products,
  SingleProduct,
  AuthWrapper,
  Cart,
  Error,
  // Checkout,
  // PrivateRoute
} from './pages'


function App() {
  return (
    <AuthWrapper>

      <AuthSync />
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        {/* <CartButtons /> */}
        {/* <Footer /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;
