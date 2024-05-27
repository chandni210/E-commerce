import React from 'react';
import "./orderSuccess.css";
import { Link } from 'react-router-dom';
import MetaData from "../layout/MetaData";
import { Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const OrderSuccess = () => {
  return (
    <>
      <MetaData title={"Order Success"} />
      <div className='orderSuccess'>
        <CheckCircleIcon />
        <Typography>Your Order has been Placed Successfully</Typography>
        <Link to="/orders">View Orders</Link>
      </div>
    </>
  );
};
export default OrderSuccess;
