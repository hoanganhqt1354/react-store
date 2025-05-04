import React from 'react'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import {
  Navbar,
  Sidebar,
  // Footer
} from './components'

import {
  Home,
  About,
  Products,
  SingleProduct,
  // Cart,
  // Error,
  // Checkout,
  // PrivateRoute
} from './pages'


function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
