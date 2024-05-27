import './Footer.css';
import React from 'react';
import appStore from "../../../Image/Appstore.png";
import playStore from "../../../Image/playstore.png";

const Footer = () => {
  return (
    <>
      <footer id="footer">
        <div className="leftFooter">
          <h4>DOWNLOAD OUR APP</h4>
          <p>Download App for Android and IOS mobile phone</p>
          <img src={playStore} alt="playstore" />
          <img src={appStore} alt="appstore" />
        </div>
        <div className="midFooter">
          <h1>Ecommerce</h1>
          <p>High Quality is our first priority</p>
          <p>Copyrights 2021 &copy; AnkitSingh</p>
        </div>
        <div className="rightFooter">
          <h4>Follow us</h4>
          <a href='http://Instagram.com/meabhisingh'>Instagram</a>
          <a href='http://Instagram.com/meabhisingh'>Youtube</a>
          <a href='http://Instagram.com/meabhisingh'>Facebook</a>
        </div>
      </footer>
    </>
  );
};
export default Footer;