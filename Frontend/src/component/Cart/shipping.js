import "./Shipping.css";
import { useAlert } from 'react-alert';
import React, { useState } from 'react';
import Metadata from "../layout/MetaData";
import HomeIcon from "@material-ui/icons/Home";
import { useNavigate } from 'react-router-dom';
import PhoneIcon from "@material-ui/icons/Phone";
import CheckoutSteps from "../Cart/CheckoutSteps";
import PublicIcon from "@material-ui/icons/Public";
import { Country, State } from "country-state-city";
import PinDropIcon from "@material-ui/icons/PinDrop";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from '../../actions/cartAction';
import LocationCityIcon from "@material-ui/icons/LocationCity";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";

const shipping = () => {
    const { shippingInfo } = useSelector((state) => state.cart);
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPincode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneno] = useState(shippingInfo.phoneNo);

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();


    const shippingSubmit = (e) => {
        e.preventDefault();
        if (phoneNo.length < 10 || phoneNo.length > 10) {
            alert.error("Phone Number should be 10 digits Long");
            return;
        }
        dispatch
            (
                saveShippingInfo
                    ({
                        address,
                        city,
                        state,
                        country,
                        pinCode,
                        phoneNo
                    })
            );
        navigate("/order/confirm");
    };

    return (
        <>
            <Metadata title="Shipping Details" />
            <CheckoutSteps activeStep={0} />
            <div className='shippingContainer'>
                <div className='shippingBox'>
                    <h2 className='shippingHeading'>Shipping Details</h2>
                    <form
                        className='shippingForm'
                        encType='multipart/form-data'
                        onSubmit={shippingSubmit}
                    >
                        <div>
                            <HomeIcon />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div>
                            <LocationCityIcon />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div>
                            <PinDropIcon />
                            <input
                                type="number"
                                placeholder="Pincode"
                                required
                                value={pinCode}
                                onChange={(e) => setPincode(e.target.value)}
                            />
                        </div>
                        <div>
                            <PhoneIcon />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneno(e.target.value)}
                                size="10"
                            />
                        </div>
                        <div>
                            <PublicIcon />
                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                    ))}
                            </select>
                        </div>
                        {country && (
                            <div>
                                <TransferWithinAStationIcon />
                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                        ))}
                                </select>
                            </div>
                        )}
                        <input
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>
        </>
    );
};
export default shipping;
