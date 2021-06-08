import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TitleSVG from "../TitleSVG";
import Region from "./RegionSelect";
import van from "../graphics/van.svg";
import shop from "../graphics/shop.svg";

export default function DistributorSignup({ status, setStatus, setData }) {
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [region, setRegion] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [alert, setAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("signup/distributor", {
                phone: phone,
                name: name,
                region: region,
                password: password,
                confirmPassword: confirmPassword,
            })
            .then((res) => {
                console.log("POST request for signup sent to port 4000...");
                if (!res.data.auth) {
                    setAlert(true);
                    console.log(res.data.message);
                    setStatus(false);
                } else {
                    setAlert(false);
                    console.log(res);
                    setData({
                        phone: phone,
                        name: name,
                        region: region,
                        password: password,
                        confirmPassword: confirmPassword,
                    });
                    setStatus(true);
                    localStorage.setItem("token", res.data.token);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div className="login-title mb-4 pb-2 mx-auto fade-in">
                <TitleSVG />
            </div>
            <h4 className="dark-blue mb-3 fade-in">Sign up as</h4>
            <div className="d-flex justify-content-center Comfortaa mb-3 pb-3 fade-in">
                <div className="btn shadow-btn-active bg-blue mx-3">
                    <img src={van} className="mx-1 btn-icon pointer-events-none" alt="Distributor" />
                    <span className="mx-1 align-middle">Distributor</span>
                </div>
                <Link to="/signup/retailer" draggable="false" className="btn shadow-btn dark-blue mx-3">
                    <img src={shop} className="btn-icon pointer-events-none" alt="Retailer" />
                    <span className="mx-1 align-middle">Retailer</span>
                </Link>
            </div>
            <div className="light-bg form-container py-4 px-3 fade-in">
                <div>
                    <form onSubmit={handleSubmit} className="form-group bg-white login-form mx-4 mt-3 mb-4 px-4 pt-1 pb-3">
                        <div className="py-3">
                            <div className="field">
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                    }}
                                    className="form-control px-3"
                                ></input>
                                <label>Phone number</label>
                            </div>
                            <div className="field">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    className="form-control px-3 mt-3"
                                ></input>
                                <label>Full name</label>
                            </div>
                            <Region setRegion={setRegion} />
                            <div className="field">
                                <input
                                    type="password"
                                    id="pass"
                                    name="password"
                                    required
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    className="form-control px-3 mt-3"
                                ></input>
                                <label>Password</label>
                            </div>
                            <div className="field">
                                <input
                                    type="password"
                                    id="confirm_pass"
                                    name="confirm_password"
                                    required
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                    }}
                                    className="form-control px-3 mt-3"
                                ></input>
                                <label>Confirm Password</label>
                            </div>
                        </div>
                        <div className="my-1 field">
                            <button className="btn mx-auto d-block bg-blue" type="submit">
                                Sign up
                            </button>
                        </div>
                    </form>
                    <h5 className="text-center dark-blue-faded pt-1">
                        Already have an account?&nbsp;
                        <Link to="/login/distributor" draggable="false" className="dark-blue text-decoration-none">
                            Log in
                        </Link>
                    </h5>
                </div>
                <div />
                <div />
                <div />
            </div>
        </>
    );
}
