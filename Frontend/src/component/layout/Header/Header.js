import React from 'react';
import "../Header/Header.css"
import {FaSearch} from 'react-icons/fa';
import {FaUserAlt} from 'react-icons/fa';
import logo from "../../../Image/logo.png";
import { ReactNavbar } from "overlay-navbar";
import {AiOutlineShoppingCart} from 'react-icons/ai';

const Header = () => {
  return (
    <ReactNavbar
    burgerColor="#eb4034"
    burgerColorHover="#a62d24"
    logo={logo}
    logoWidth="20vmax"
    navColor1="white"
    logoHoverSize="10px"
    logoHoverColor="#eb4034"
    link1Text="Home"
    link2Text="Products"
    link3Text="Contact"
    link4Text="About"
    link1Url="/" 
    link2Url="/products"
    link3Url="/contact"
    link4Url="/about"
    link1Size="1.3vmax"
    link1Color="rgba(35,35,35,0.8)"
    nav1justifyContent="flex-end"     
    nav2justifyContent="flex-end" 
    nav3justifyContent="flex-start"
    nav4justifyContent="flex-start"
    link1ColorHover="#eb4034"
    link2ColorHover="#eb4034"
    link3ColorHover="#eb4034"
    link4ColorHover="#eb4034"
    link2Margin="5vmax"
    link3Margin="0"
    link4Margin="5vmax"
    profileIcon={true}
    ProfileIconElement={FaUserAlt}
    searchIcon={true}
    SearchIconElement={FaSearch}
    cartIcon={true}
    CartIconElement={AiOutlineShoppingCart}
    profileIconColor="rgba(35,35,35,0.8)"
    profileIconUrl="/login"
    searchIconColor="rgba(35,35,35,0.8)"
    cartIconColor="rgba(35,35,35,0.8)"
    profileIconColorHover="#eb4034"
    searchIconColorHover="#eb4034"
    cartIconColorHover="#eb4034"
    cartIconMargin="3vmax"
    />
  );
};
export default Header;