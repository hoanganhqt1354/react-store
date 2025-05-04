import React from 'react'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import {
  Navbar,
  // Sidebar,
  // Footer
} from './components'

import {
  Home,
  About,
  Products,
  // SingleProduct,
  // Cart,
  // Error,
  // Checkout,
  // PrivateRoute
} from './pages'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
      <Routes>
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
