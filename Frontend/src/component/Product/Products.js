import "./Products.css";
import { useAlert } from "react-alert";
import MetaData from '../layout/MetaData';
import { Typography } from '@mui/material';
import Loader from "../layout/Loader/Loader";
import Pagination from "react-js-pagination";
import { useParams } from 'react-router-dom';
import ProductCard from '../Home/ProductCard';
import Slider from "@material-ui/core/Slider";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';

const categories = [
    "Sports", 
    "home and Kitchen",
    "Fashion",
    "Books",
    "Electronics",
    "Watches",
    "Spectacles",
];

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const dispatch = useDispatch();
    const alert = useAlert();
    const { keyword } = useParams();

    const {
        products,
        loading,
        error,
        resultPerPage,
        productCount
    } = useSelector(state => state.products);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title="PRODUCTS -- ECOMMERCE" />
                    <h2 className='productHeading'>Products</h2>
                    <div className='products'>
                        {products && products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                    <div className='filterBox'>
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby='range-slider'
                            min={0}
                            max={25000}
                        />
                        <Typography>Categories</Typography>
                        <ul className='categoryBox'>
                            {categories.map((category) => (
                                <li
                                    className='category-link'
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                min={0}
                                max={5}
                                valueLabelDisplay="auto"
                            />
                        </fieldset>
                    </div>
                    {resultPerPage < productCount &&
                        <div className='paginationBox'>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass='page-item'
                                linkClass='page-link'
                                activeClass='pageItemActive'
                                activeLinkClass='pageLinkActive'
                            />
                        </div>
                    }
                </>
            }
        </>
    );
};
export default Products;
