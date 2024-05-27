import "./Search.css";
import React, { useState } from 'react';
import MetaData from '../layout/MetaData';
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        }
        else {
            navigate("/products");
        }
    };

    return (
        <>
            <MetaData title="Search a Product -- ECOMMERCE" />
            <form className='searchBox'>
                <input
                    type="text"
                    placeholder='Search a Product ...'
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button type='Submit' onClick={searchSubmitHandler} >Search</button>
            </form>
        </>
    );
};
export default Search;