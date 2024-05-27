import "./ProductList.css";
import Sidebar from "./Slidebar";
import { useAlert } from "react-alert";
import React, { useEffect } from 'react';
import MetaData from "../layout/MetaData";
import { Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_ORDERS_RESET } from '../../constants/orderConstants';
import { deleteOrder, getAllOrders, clearErrors } from '../../actions/orderAction';

const OrderList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("Order Deleted Successfully");
            navigate("/admin/orders");
            dispatch({ type: DELETE_ORDERS_RESET });
        }
        dispatch(getAllOrders());
    }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

    const columns = [
        {
            field: "id",
            HeaderName: "Order ID",
            minWidth: 300,
            flex: 1
        },
        {
            field: "status",
            HeaderName: "Status",
            minWidth: 150,
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
            flex: 0.4
        },
        {
            field: "amount",
            HeaderName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.7
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            type: "number",
            minWidth: 150,
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </>
                )
            }
        },
    ];

    const rows = [];

    orders && orders.forEach((item) => {
        rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
        });
    });

    return (
        <>
            <MetaData title={`ALL ORDERS - ADMIN`} />
            <div className='dashboard'>
                <Sidebar />
                <div className='productListContainer'>
                    <h1 id='productListHeading'>ALL ORDERS</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className='productListTable'
                        autoHeight
                    />
                </div>
            </div>
        </>
    );
};
export default OrderList;