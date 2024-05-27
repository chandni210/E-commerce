import "./UpdatePassword.css";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import React, { useState, useEffect } from 'react';
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useDispatch, useSelector } from "react-redux";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { clearErrors, updatePassword } from "../../actions/userAction";

const UpdatePassword = () => {
    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const {
        error,
        isUpdated,
        loading
    } = useSelector(state => state.profile);

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            navigate(`/account`);
            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, error, alert, navigate, isUpdated]);

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title="Change Password" />
                    <div className='updatePasswordContainer'>
                        <div className='updatePasswordBox'>
                            <h2 className='updatePasswordHeading'>Change Password</h2>
                            <form
                                className='updatePasswordForm'
                                onSubmit={updatePasswordSubmit}
                            >
                                <div className='loginPassword'>
                                    <VpnKeyIcon />
                                    <input
                                        type="password"
                                        placeholder="old Password"
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setoldPassword(e.target.value)}
                                    />
                                </div>
                                <div className='loginPassword'>
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setnewPassword(e.target.value)}
                                    />
                                </div>
                                <div className='loginPassword'>
                                    <LockIcon />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setconfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Change"
                                    className="updatePasswordBtn"
                                    disabled={loading ? true : false}
                                />
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    );
};
export default UpdatePassword;