import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TitleSVG from "../TitleSVG";
import van from "../graphics/van.svg";
import shop from "../graphics/shop.svg";

export default function RetailerSignup() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    axios
        .post("http://localhost:4000/signup/retailer", {
            phone: phone,
            password: password,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });

    return (
        <>
            <div className="login-title my-5 mx-auto">
                <TitleSVG />
            </div>
            <h4 className="dark-blue mb-3">Sign up as</h4>
            <div className="d-flex justify-content-center Comfortaa mb-4 pb-3">
                <Link
                    to="/signup/distributor"
                    draggable="false"
                    className="btn shadow-btn dark-blue mx-3"
                >
                    <img
                        src={van}
                        className="mx-1 btn-icon pointer-events-none"
                        alt="Distributor"
                    />
                    <span className="mx-1 align-middle">Distributor</span>
                </Link>
                <div className="btn shadow-btn-active bg-blue mx-3">
                    <img
                        src={shop}
                        className="btn-icon pointer-events-none"
                        alt="Retailer"
                    />
                    <span className="mx-1 align-middle">Retailer</span>
                </div>
            </div>
            <div className="light-bg px-4 pt-4 pb-5 fade-in">
                <form
                    onSubmit={handleSubmit}
                    className="form-group bg-white login-form mx-4 my-3 px-4 py-3"
                >
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
                                className="form-control px-3 mb-3"
                            ></input>
                            <label>Phone number</label>
                        </div>
                        <div className="field">
                            <input
                                type="password"
                                id="pass"
                                name="password"
                                required
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                className="form-control px-3 mt-4"
                            ></input>
                            <label>Password</label>
                        </div>
                    </div>
                    <div className="my-2 field">
                        <button
                            className="btn mx-auto d-block bg-blue"
                            type="submit"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
                <h5 className="text-center mt-4 pt-3 dark-blue-faded">
                    Already have an account?&nbsp;
                    <Link
                        to="/login/retailer"
                        draggable="false"
                        className="dark-blue text-decoration-none"
                    >
                        Log in
                    </Link>
                </h5>
            </div>
        </>
    );
}
