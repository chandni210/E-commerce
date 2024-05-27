import "./ProductReviews.css";
import Sidebar from "./Slidebar";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { Button } from '@material-ui/core';
import Star from "@material-ui/icons/Star";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from 'react';
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import { clearErrors, getAllReviews, deleteReviews } from '../../actions/productAction';

const ProductReviews = () => {

  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, reviews, loading } = useSelector((state) => state.productReviews);
  const { error: deleteError, isDeleted } = useSelector((state) => state.review);

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };
  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Review Delete Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, navigate, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    { field: "user", headerName: "User", minWidth: 190, flex: 0.3 },
    { field: "comment", headerName: "Comment", minWidth: 250, flex: 0.6 },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      }
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      type: "number",
      minWidth: 300,
      flex: 0.2,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => deleteReviewHandler(params.getValue(params.id, "id"))}>
              <DeleteIcon />
            </Button>
          </>
        )
      }
    },
  ];
  const rows = [];

  reviews && reviews.forEach((item) => {
    rows.push({
      id: item._id,
      rating: item.rating,
      comment: item.comment,
      user: item.name,
    });
  });

  return (
    <>
      <MetaData title={`ALL REVIEWS - ADMIN`} />
      <div className='dashboard'>
        <Sidebar />
        <div className='productReviewsContainer'>
          <form
            className='productReviewsForm'
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className='productReviewsFormHeading'>All Reviews</h1>
            <div>
              <Star />
              <input
                type="text"
                placeholder='Product ID'
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false || productId === "" ? true : false}
            >
              Search
            </Button>
          </form>
          {
            reviews && reviews.length > 0 ?
              (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className='productListTable'
                  autoHeight
                />
              ) :
              (
                <h1 className='productReviewsFormHeading'>
                  No Reviews Found
                </h1>
              )
          }
        </div>
      </div>
    </>
  );
};
export default ProductReviews;