import React from 'react';
import './App.css';
import Listearticles from './components/articles/Listearticles';
import Cart from './components/articles/Cart';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import NavScroll from './components/articles/NavScroll';
import StripePayment from './components/StripePayment';
import CheckoutSuccess from './components/articles/CheckoutSucces';
import PdfCart from './components/articles/PdfCart';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProductsAppAdmin from './Admin/components/articles/ProductsAppAdmin';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
    <ToastContainer/>
    <Router>
    <NavScroll/>
      <Routes>
      <Route path='/articles' element={<Listearticles/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/checkout' element={<CheckoutSuccess/>}/>
      <Route path='/pay/:total' element={<StripePayment/>}/>
      <Route path="/pdfcart" element={<PdfCart/>}/>
      <Route path='/articlesadmin' element={<ProductsAppAdmin/>}/>
      </Routes>
      </Router>
      </div>
      
  );
}
export default App;
