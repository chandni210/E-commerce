import "./UpdateProfile.css";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import FaceIcon from "@material-ui/icons/Face";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { user } = useSelector(state => state.user);
  const {
    error,
    isUpdated,
    loading,
  } = useSelector(state => state.profile);


  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setName(user.name)
      setAvatarPreview(user.avatar.url)
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate(`/account`);
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);

  return (
    <>
      {loading ? <Loader /> :
        <>
          <MetaData title="Update Profile" />
          <div className='updateProfileContainer'>
            <div className='updateProfileBox'>
              <h2 className='updateProfileHeading'>Update Profile</h2>
              <form
                className='updateProfileForm'
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className='updateProfileName'>
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='updateProfileEmail'>
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
                <div id='updateProfileImage'>
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name='avatar'
                    accept='image/*'
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
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
export default UpdateProfile;