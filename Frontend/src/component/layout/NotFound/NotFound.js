import "./NotFound.css";
import React from 'react';
import MetaData from "../MetaData";
import { Link } from "react-router-dom";
import { Typography } from '@material-ui/core';
import ErrorIcon from "@material-ui/icons/Error";

const NotFound = () => {
  return (
    <>
      <MetaData title={"Page Not Found"} />
      <div className='PageNotFound'>
        <ErrorIcon />
        <Typography>Page Not Found</Typography>
        <Link to="/">Home</Link>
      </div>
    </>
  );
};
export default NotFound;