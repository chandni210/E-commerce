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
import { DELETE_USER_RESET } from '../../constants/userConstants';
import { getAllUsers, clearErrors, deleteUser } from '../../actions/userAction';

const UsersList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { error, users } = useSelector((state) => state.allUsers);
    const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
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
            alert.success(message);
            navigate("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }
        dispatch(getAllUsers());
    }, [dispatch, alert, error, deleteError, isDeleted, navigate, message]);

    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.5 },
        { field: "email", headerName: "Email", minWidth: 200, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },
        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
                    ? "greenColor" : "redColor";
            }
        },
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
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </>
                )
            }
        },
    ];
    const rows = [];

    users && users.forEach((item) => {
        rows.push({
            id: item._id,
            role: item.role,
            email: item.email,
            name: item.name,
        });
    });

    return (
        <>
            <MetaData title={`ALL USERS - ADMIN`} />
            <div className='dashboard'>
                <Sidebar />
                <div className='productListContainer'>
                    <h1 id='productListHeading'>ALL USERS</h1>
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
export default UsersList;