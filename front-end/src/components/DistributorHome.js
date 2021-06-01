import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TitleSVG from "../TitleSVG";

export default function DistributorHome() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    axios
        .post("http://localhost:4000/login/distributor", {
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
            <div className="login-title mb-4 pb-2 mx-auto fade-in">
                <TitleSVG />
            </div>
            <h4 className="dark-blue mb-3 fade-in">Log in as</h4>
            <div className="d-flex justify-content-center Comfortaa mb-3 pb-3 fade-in">
                <div className="btn shadow-btn-active bg-blue mx-3">
                    <img
                        src={van}
                        className="mx-1 btn-icon pointer-events-none"
                        alt="Distributor"
                    />
                    <span className="mx-1 align-middle">Distributor</span>
                </div>
                <Link
                    to="/login/retailer"
                    draggable="false"
                    className="btn shadow-btn dark-blue mx-3"
                >
                    <img
                        src={shop}
                        className="btn-icon pointer-events-none"
                        alt="Retailer"
                    />
                    <span className="mx-1 align-middle">Retailer</span>
                </Link>
            </div>
            <div className="light-bg form-container py-4 px-3 fade-in">
                <div>
                    <form
                        onSubmit={handleSubmit}
                        className="form-group bg-white login-form mx-4 mt-3 mb-4 px-4 pt-1 pb-3"
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
                                    className="form-control px-3"
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
                        <div className="my-1 field">
                            <button
                                className="btn mx-auto d-block bg-blue"
                                type="submit"
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                    <h5 className="text-center dark-blue-faded pt-1">
                        Don't have an account?&nbsp;
                        <Link
                            to="/signup/distributor"
                            draggable="false"
                            className="dark-blue text-decoration-none"
                        >
                            Sign up
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
