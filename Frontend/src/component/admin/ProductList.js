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
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import { clearErrors, getAdminProduct, deleteProduct } from '../../actions/productAction';

const ProductList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, products } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector((state) => state.delProduct);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
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
            alert.success("Product Deleted Successfully");
            navigate("/admin/dashboard");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        dispatch(getAdminProduct());
    }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 300, flex: 1 },
        { field: "stock", headerName: "Stock", type: "number", minWidth: 150, flex: 0.3 },
        { field: "price", headerName: "Price", type: "number", minWidth: 150, flex: 0.3 },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            type: "number",
            minWidth: 150,
            flex: 0.3,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </>
                )
            }
        },
    ];
    const rows = [];

    products && products.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name,
        });
    });

    return (
        <>
            <MetaData title={`ALL PRODUCTS - ADMIN`} />
            <div className='dashboard'>
                <Sidebar />
                <div className='productListContainer'>
                    <h1 id='productListHeading'>ALL PRODUCTS</h1>
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
export default ProductList;
