import "./ForgotPassword.css";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { clearErrors, forgotPassword } from "../../actions/userAction";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const alert = useAlert();

    const {
        error,
        message,
        loading
    } = useSelector(state => state.forgotPassword);

    const ForgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
        }
    }, [dispatch, error, alert, message]);

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title="Forgot Password Profile" />
                    <div className='ForgotPasswordContainer'>
                        <div className='ForgotPasswordBox'>
                            <h2 className='ForgotPasswordHeading'>Forgot Password</h2>
                            <form
                                className='ForgotPasswordForm'
                                onSubmit={ForgotPasswordSubmit}
                            >

                                <div className='ForgotPasswordEmail'>
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Send"
                                    className="ForgotPasswordBtn"
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

export default ForgotPassword;
