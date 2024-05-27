import './App.css';
import axios from 'axios';
import store from "./Store"; 
import Cart from "./component/Cart/Cart";
import Home from "./component/Home/Home";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile";
import Payment from "./component/Cart/Payment";
import { loadStripe } from '@stripe/stripe-js';
import { loadUser } from './actions/userAction';
import Search from "./component/Product/Search";
import Shipping from "./component/Cart/shipping";
import MyOrders from "./component/Order/MyOrders";
import { Elements } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Products from "./component/Product/Products";
import Dashboard from "./component/admin/Dashboard";
import OrderList from "./component/admin/OrderList";
import UsersList from "./component/admin/UsersList";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import NewProduct from './component/admin/NewProduct';
import UpdateUser from "./component/admin/UpdateUser";
import About from "./component/layout/About/About.js";
import LoginSignUp from './component/User/LoginSignUp';
import ProductList from "./component/admin/ProductList";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import OrderSuccess from "./component/Cart/OrderSuccess";
import OrderDetails from "./component/Order/OrderDetails";
import ProcessOrder from "./component/admin/ProcessOrder";
import UpdateProfile from "./component/User/UpdateProfile";
import ResetPassword from "./component/User/ResetPassword";
import UpdateProduct from "./component/admin/UpdateProduct";
import NotFound from './component/layout/NotFound/NotFound';
import Contact from "./component/layout/Contact/Contact.js";
import ForgotPassword from "./component/User/ForgotPassword";
import UpdatePassword from "./component/User/UpdatePassword";
import UserOptions from "./component/layout/Header/UserOptions";
import ProductDetails from "./component/Product/ProductDetails";
import ProductReviews from "./component/admin/ProductReviews.js";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const {
    loading,
    isAuthenticated,
    user
  } = useSelector(state => state.user);

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/payment/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  };

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu",(e)=>e.preventDefault());
  return (
    <Router>
      <Header />
      {
        isAuthenticated &&
        <UserOptions
          user={user}
        />
      }
      <Routes>
        <Route extact path="/" element={<Home />} />
        <Route extact path="/product/:id" element={<ProductDetails />} />
        <Route extact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route extact path="/search" element={<Search />} />
        <Route extact path="/login" element={<LoginSignUp />} />
        <Route extact path="/cart" element={<Cart />} />
        <Route extact path="/contact" element={<Contact />} />
        <Route extact path="/about" element={<About />} />
        <Route extact path="/password/forgot" element={<ForgotPassword />} />
        <Route extact path="/password/reset/:token" element={<ResetPassword />} />
        {
          !loading &&
          <Route
            extact path="/account"
            element={
              (isAuthenticated === true) ?
                <Profile /> :  <Navigate to="/login" /> 
            }
          />
        }
        {
          !loading &&
          <Route
            extact path="/me/update"
            element={
              (isAuthenticated === false) ?
                <Navigate to="/login" /> : <UpdateProfile />
            }
          />
        }
        {
          !loading &&
          <Route
            extact path="/password/update"
            element={
              (isAuthenticated === false) ?
                <Navigate to="/login" /> : <UpdatePassword />
            }
          />
        }
        {
          !loading &&
          <Route
            extact path="/login/shipping"
            element={
              (isAuthenticated === false) ?
                <Navigate to="/login" /> : <Shipping />
            }
          />
        }
        {
          stripeApiKey && !loading &&
          (
            <Route
              extact path="/process/payment"
              element={
                (isAuthenticated === false) ?
                  <Navigate to="/login" /> :
                  (
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <Payment />
                    </Elements>
                  )
              }
            />
          )
        }
        {
          !loading &&
          <Route
            extact path="/success"
            element={
              (isAuthenticated === false) ?
                <Navigate to="/login" /> : <OrderSuccess />
            }
          />
        }
        {
          !loading &&
          <Route
            extact path="/orders"
            element={
              (isAuthenticated === false) ?
                <Navigate to="/login" /> : <MyOrders />
            }
          />
        }
        {
          !loading &&
          <Route
            extact path="/order/confirm"
            element={
              (isAuthenticated === false) ?
                <Navigate to="/login" /> : <ConfirmOrder />
            }
          />
        }
        {
          !loading &&
          <Route
            extact path="/order/:id"
            element={
              (isAuthenticated === false) ?
                <Navigate to="/login" /> : <OrderDetails />
            }
          />
        }
        {
          !loading &&
          <Route
            extact path="/admin/dashboard"
            element={
              (isAuthenticated === false) || (user.role === "user" && user.role !== "admin") ?
                <Navigate to="/login" /> : <Dashboard />
            }
          />
        }
        {
          !loading &&
          <Route
            extact path="/admin/products"
            element={
              (isAuthenticated === false) || (user.role === "user" && user.role !== "admin") ?
                <Navigate to="/login" /> : <ProductList />
            }
          />
        }
        {
          !loading &&
          <Route
            extact path="/admin/newproduct"
            element={
              (isAuthenticated === false) || (user.role === "user" && user.role !== "admin") ?
                <Navigate to="/login" /> : <NewProduct />
            }
          />
        }
        {
          !loading &&
          <Route
            extact path="/admin/product/:id"
            element={
              (isAuthenticated === false) || (user.role === "user" && user.role !== "admin") ?
                <Navigate to="/login" /> : <UpdateProduct />
            }
          />
        }
        {
          !loading &&
          <Route
            extact path="/admin/orders"
            element={
              (isAuthenticated === false) || (user.role === "user" && user.role !== "admin") ?
                <Navigate to="/login" /> : <OrderList />
            }
          />
        }
        {
          !loading &&
          <Route
            extact path="/admin/order/:id"
            element={
              (isAuthenticated === false) || (user.role === "user" && user.role !== "admin") ?
                <Navigate to="/login" /> : <ProcessOrder />
            }
          />
        }
        {
          !loading &&
          <Route
            extact path="/admin/users"
            element={
              (isAuthenticated === false) || (user.role === "user" && user.role !== "admin") ?
                <Navigate to="/login" /> : <UsersList />
            }
          />
        }
        {
          !loading &&
          <Route
            extact path="/admin/user/:id"
            element={
              (isAuthenticated === false) || (user.role === "user" && user.role !== "admin") ?
                <Navigate to="/login" /> : <UpdateUser />
            }
          />
        }
        {
          !loading &&
          <Route
            extact path="/admin/reviews"
            element={
              (isAuthenticated === false) || (user.role === "user" && user.role !== "admin") ?
                <Navigate to="/login" /> : <ProductReviews />
            }
          />
        }
        {
          !loading &&
          <Route
            extact path="/*"
            element={
              <NotFound />
            }
          />
        }
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;