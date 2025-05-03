import React from 'react'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
// import { Navbar, Sidebar, Footer } from './components'

import {
  Home,
  // Products,
  // SingleProduct,
  // About,
  // Cart,
  // Error,
  // Checkout,
  // PrivateRoute
} from './pages'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
