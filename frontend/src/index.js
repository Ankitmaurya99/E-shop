import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import About from './About';
import Contact from './Contact';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Product from './Product';
import AdminHome from './admin/adminhome';
import Category from './admin/category';
import Login from './admin/login';
import Adminproduct from './admin/adminproduct';
import ULogin from './ULogin';
import USignup from './USignup';
import Cart from './cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route exact path='/' element={<App />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/contact' element={<Contact />} />
              <Route exact path='/product' element={<Product />} />
              <Route exact path='/product/:id' element={<Product />} />
              <Route exact path='/ulogin' element={<ULogin />} />
              <Route exact path='/usignup' element={<USignup />} />
              <Route exact path='/cart' element={<Cart />} />

              <Route exact path='/admin' element={<Login />} />
              <Route exact path='/dashboard' element={<AdminHome />} />
              <Route exact path='/adminhome' element={<AdminHome />} />
              <Route exact path='/category' element={<Category />} />
              <Route exact path='/adminproduct' element={<Adminproduct />} />

          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();