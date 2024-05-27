import "./ResetPassword.css";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import LockIcon from "@material-ui/icons/Lock";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, resetPassword } from "../../actions/userAction";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { token } = useParams();


    const {
        error,
        success,
        loading
    } = useSelector(state => state.forgotPassword);


    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token, myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Updated Successfully");
            navigate(`/login`);
        }
    }, [dispatch, error, alert, navigate, success]);

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title="Reset Password" />
                    <div className='resetPasswordContainer'>
                        <div className='resetPasswordBox'>
                            <h2 className='resetPasswordHeading'>Reset Password</h2>
                            <form
                                className='resetPasswordForm'
                                onSubmit={resetPasswordSubmit}
                            >
                                <div >
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div >
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
                                    value="Update"
                                    className="resetPasswordBtn"
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
export default ResetPassword;