import "./MyOrders.css";
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { DataGrid } from "@material-ui/data-grid";
import LaunchIcon from "@material-ui/icons/Launch";
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, myOrders } from '../../actions/orderAction';

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    loading,
    error,
    orders,
  } = useSelector((state) => state.myOrders);

  const { user } = useSelector((state) => state.user);

  const columns = [{
    field: "id",
    HeaderName: "Order ID",
    minWidth: 300,
    flex: 1
  },
  {
    field: "status",
    HeaderName: "Status",
    minWidth: 260,
    flex: 0.5,
    cellClassName: (params) => {
      return params.getValue(params.id, "status") === "Delivered"
        ? "greenColor" : "redColor";
    }
  },
  {
    field: "itemsQty",
    HeaderName: "Items Qty",
    type: "number",
    minWidth: 150,
    flex: 0.3
  },
  {
    field: "amount",
    HeaderName: "Amount",
    type: "number",
    minWidth: 150,
    flex: 0.5
  },
  {
    field: "actions",
    HeaderName: "Actions",
    type: "number",
    minWidth: 150,
    sortable: false,
    flex: 0.3,
    renderCell: (params) => {
      return (
        <Link to={`/order/${params.getValue(params.id, "id")}`}>
          <LaunchIcon />
        </Link>
      );
    }
  },];
  const rows = [];

  orders && orders.forEach((item, index) => {
    rows.push({
      itemsQty: item.orderItems.length,
      id: item._id,
      status: item.orderStatus,
      amount: item.totalPrice,
    });
  });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <>
      <MetaData title={`${user.name} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className='myOrdersPage'>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='myOrdersTable'
            autoHeight
          />
          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </>
  );
};
export default MyOrders;