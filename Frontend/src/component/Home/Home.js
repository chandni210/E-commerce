import './Home.css';
import { useAlert } from 'react-alert';
import ProductCard from './ProductCard';
import React, { useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    error,
    products
  } = useSelector(state => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? <Loader /> :
        <>
          <MetaData title="ECOMMERCE" />
          <div className='banner'>
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href='#container'>
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className='homeHanding'>Featured Products</h2>
          <div className='container' id='container'>
            {products && products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      }
    </>
  );
};
export default Home;
