import Slidebar from './Slidebar';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { Button } from '@material-ui/core';
import Loader from '../layout/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import { getUserDetails, updateUser, clearErrors } from '../../actions/userAction';

const UpdateUser = () => {
    const [role, setRole] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { id } = useParams();
    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading: updateloading, error: updateError, isUpdated } = useSelector((state) => state.profile);

    const userId = id;
    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setRole(user.role);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("User Update Successfully");
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("role", role);
        dispatch(updateUser(userId, myForm));
    };

    return (
        <>
            <MetaData title="Update User" />
            <div className='dashboard'>
                <Slidebar />
                <div className='newProductContainer'>
                    {loading ? <Loader /> :
                        <form
                            className='createProductForm'
                            onSubmit={updateUserSubmitHandler}
                        >
                            <h1>Update User</h1>
                            <div>
                                <VerifiedUserIcon />
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Choose Role</option>
                                    <option value="admin">admin</option>
                                    <option value="user">user</option>
                                </select>
                            </div>
                            <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={updateloading ? true : false || role === "" ? true : false}
                            >
                                Update
                            </Button>
                        </form>
                    }
                </div>
            </div>
        </>
    );
};
export default UpdateUser;