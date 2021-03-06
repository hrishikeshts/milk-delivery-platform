import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import TitleSVG from "../../TitleSVG";
import Region from "./RegionSelect";
import van from "../../assets/van.svg";
import shop from "../../assets/shop.svg";

export default function RetailerSignup({
    loadingTime,
    loadingData,
    setLoadingData,
    status,
    setStatus,
    setRole,
    setData,
}) {
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [region, setRegion] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [alert, setAlert] = useState("");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            document.title = "Sign Up as Retailer – DairyDash";

            axios
                .get("/retailer/region")
                .then((res) => {
                    // console.log(res.data);
                    setLoadingData(1);
                    const options = res.data.map((data) => ({
                        value: data.region,
                        label: data.region,
                    }));
                    setOptions(options);
                })
                .catch((err) => {
                    console.error(err.response);
                });
        }

        return function cleanup() {
            mounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (confirmPassword !== password) {
            console.error("Passwords mismatch!");
            setAlert("Those passwords didn’t match. Try again!");
        } else {
            axios
                .post("/retailer/signup", {
                    phone: phone,
                    name: name,
                    region: region.value,
                    password: password,
                })
                .then((res) => {
                    console.log("POST request for retailer signup sent...");
                    if (res.data.alert) {
                        console.log(res.data);
                        setAlert(res.data.alert);
                    } else if (!res.data.auth) {
                        setAlert("User already exists! Log in to continue...");
                        console.log(res.data.message);
                        setStatus(false);
                    } else {
                        // console.log(res);
                        setData({
                            rid: res.data.result.insertId,
                            phone: phone,
                            name: name,
                            region: region.value,
                            password: password,
                        });
                        setStatus(true);
                        setRole(false);

                        localStorage.setItem("token", res.data.token);
                    }
                })
                .catch((err) => {
                    console.error(err.response);
                    if (err.response.status === 409) {
                        setAlert(err.response.data);
                    }
                });
        }
    };

    if (loadingTime) {
        return (
            <div className={`splash splash-${loadingData > 0 ? 1 : 0}`}>
                <TitleSVG />
                <div className="invisible mt-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    } else if (loadingData === 0) {
        setTimeout(() => {
            window.location.reload();
        }, 10000);

        return (
            <div className={`splash`}>
                <TitleSVG />
                <div className="fade-in mt-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
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
                <h4 className="dark-blue mb-3">Sign Up as</h4>
                <div className="d-flex justify-content-center Comfortaa mb-3 pb-2">
                    <Link to="/signup/distributor" draggable="false" className="btn shadow-btn dark-blue mx-3">
                        <img src={van} className="mx-1 btn-icon pointer-events-none" alt="Distributor" />
                        <span className="mx-1 align-middle">Distributor</span>
                    </Link>
                    <div className="btn shadow-btn-active bg-blue mx-3">
                        <img src={shop} className="btn-icon pointer-events-none" alt="Retailer" />
                        <span className="mx-1 align-middle">Retailer</span>
                    </div>
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
                                        title="must be a valid 10 digit mobile number"
                                        pattern="[5-9][0-9]{9}"
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                        }}
                                        className={`form-control px-3 ${phone ? "valid" : ""}`}
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
                                <Region
                                    options={options}
                                    setRegion={setRegion}
                                    message="No regions assigned with distributors!"
                                />
                                <input value={region} required onChange={() => {}} className="select-input" />
                                <div className="field">
                                    <input
                                        type="password"
                                        id="pass"
                                        name="password"
                                        required
                                        pattern="^.{8,}$"
                                        title="must contain at least 8 or more characters"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        className={`form-control px-3 ${password ? "valid" : ""}`}
                                    ></input>
                                    <label>Password</label>
                                </div>
                                <div className="field">
                                    <input
                                        type="password"
                                        id="confirm_pass"
                                        name="confirm_password"
                                        required
                                        pattern="^.{8,}$"
                                        title="must contain at least 8 or more characters"
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                        }}
                                        className={`form-control px-3 ${confirmPassword ? "valid" : ""}`}
                                    ></input>
                                    <label>Confirm Password</label>
                                </div>
                            </div>
                            <small className={alert ? "warning" : "invisible"}>{alert}&nbsp;</small>
                            <div className="mt-1 mb-2 field">
                                <button className="btn button mx-auto d-block bg-blue" type="submit">
                                    Sign up
                                </button>
                            </div>
                        </form>
                        <h5 className="text-center dark-blue-faded mb-2">
                            Already have an account?&nbsp;
                            <Link to="/login/retailer" draggable="false" className="dark-blue text-decoration-none">
                                Log in
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
