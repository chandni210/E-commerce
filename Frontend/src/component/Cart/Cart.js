import "./Cart.css";
import React from 'react';
import MetaData from "../layout/MetaData";
import CartItemCard from "./CartItemCard";
import { Typography } from "@material-ui/core";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    };
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    };
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  }

  const checkoutHandler = () => {
    navigate(`/login?redirect=shipping`);
  }

  return (
    <>
      <MetaData title={"Product - Cart"} />
      {cartItems.length === 0 ?
        (
          <div className='emptyCart'>
            <RemoveShoppingCartIcon />
            <Typography>No Product in Your Cart</Typography>
            <Link to="/products">View Products</Link>
          </div>
        )
        : <>
          <div className='cartPage'>
            <div className='cartHeader'>
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {
              cartItems && cartItems.map((item) => (
                <div className='cartContainer' key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className='cartInput'>
                    <button onClick={() => decreaseQuantity(item.product, item.quantity)}>
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>
                      +
                    </button>
                  </div>
                  <p className='cartSubtotal'>{`₹${item.price * item.quantity}`}</p>
                </div>
              ))
            }
            <div className='cartGrossTotal'>
              <div></div>
              <div className='cartGrossProfitBox'>
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</p>
              </div>
              <div></div>
              <div className='checkOutBtn'>
                <button onClick={checkoutHandler}>check out</button>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};
export default Cart;