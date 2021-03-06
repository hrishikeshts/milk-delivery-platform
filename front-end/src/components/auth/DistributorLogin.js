import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import TitleSVG from "../../TitleSVG";
import van from "../../assets/van.svg";
import shop from "../../assets/shop.svg";

export default function DistributorLogin({ loadingTime, status, setStatus, setRole, setData }) {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [alert, setAlert] = useState("");

    useEffect(() => {
        document.title = "Log In as Distributor – DairyDash";
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("/distributor/login", {
                phone: phone,
                password: password,
            })
            .then((res) => {
                console.log("POST request for distributor login sent...");
                if (!res.data.auth) {
                    setAlert(res.data.message);
                    console.log(res.data.message);
                    setStatus(false);
                } else {
                    setAlert("");
                    console.log(res);
                    setData(res.data.result[0]);
                    setStatus(true);
                    setRole(true);

                    localStorage.setItem("token", res.data.token);
                }
            })
            .catch((err) => {
                console.error(err.response);
                if (err.response.status === 401) {
                    setAlert(err.response.data);
                }
            });
    };

    if (loadingTime) {
        return (
            <div className="splash splash-1">
                <TitleSVG />
            </div>
        );
    } else if (status) {
        return <Redirect to="/" />;
    } else {
        return (
            <div className="auth fade-in">
                <div className="login-title mb-3 pb-2 mx-auto">
                    <TitleSVG />
                </div>
                <h4 className="dark-blue mb-3">Log In as</h4>
                <div className="d-flex justify-content-center Comfortaa mb-3 pb-2">
                    <div className="btn shadow-btn-active bg-blue mx-3">
                        <img src={van} className="mx-1 btn-icon pointer-events-none" alt="Distributor" />
                        <span className="mx-1 align-middle">Distributor</span>
                    </div>
                    <Link to="/login/retailer" draggable="false" className="btn shadow-btn dark-blue mx-3">
                        <img src={shop} className="btn-icon pointer-events-none" alt="Retailer" />
                        <span className="mx-1 align-middle">Retailer</span>
                    </Link>
                </div>
                <div className="light-bg form-container py-4 px-3">
                    <div>
                        <form onSubmit={handleSubmit} className="form-group white-card mx-4 mt-3 mb-4 px-4 pt-1 pb-3">
                            <div className="pt-3">
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
                            <small className={alert ? "warning" : "invisible"}>{alert}&nbsp;</small>
                            <div className="mt-1 mb-2 field">
                                <button className="btn button mx-auto d-block bg-blue" type="submit">
                                    Log in
                                </button>
                            </div>
                        </form>
                        <h5 className="text-center dark-blue-faded mb-2">
                            Don't have an account?&nbsp;
                            <Link to="/signup/distributor" draggable="false" className="dark-blue text-decoration-none">
                                Sign up
                            </Link>
                        </h5>
                    </div>
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        );
    }
}
