import "./Contact.css";
import React from 'react';
import MetaData from "../MetaData";
import { Button } from '@material-ui/core';

const Contact = () => {
  return (
    <>
      <MetaData title={"Contact Page"} />
      <div className='contactContainer'>
        <a className='mailBtn' href='mailto:mymailforabhi@gmail.com'>
          <Button>Contact: mymailforabhi@gmail.com </Button>
        </a>
      </div>
    </>
  );
};
export default Contact;