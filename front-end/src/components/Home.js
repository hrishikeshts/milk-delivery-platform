import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TitleSVG from "../TitleSVG";
import "../Home.css";

export default function Home({ status, data }) {
    if (status) {
        return (
            <>
                {/* <Route path="/" exact>
                    <DistributorHome status={status} data={data} />
                </Route>
                <Route path="/" exact>
                    <RetailerHome status={status} data={data} />
                </Route> */}
                <h4 className="dark-blue mb-3 fade-in">Log in as</h4>
                <div className="d-flex justify-content-center Comfortaa mb-3 pb-2 fade-in">
                    <div className="btn shadow-btn-active bg-blue mx-3">
                        <span className="mx-1 align-middle">Distributor</span>
                    </div>
                    <a
                        href="/"
                        onClick={() => {
                            localStorage.clear();
                        }}
                    >
                        Log out
                    </a>
                </div>
                <div className="light-bg form-container py-4 px-3 fade-in">
                    <div>
                        <form className="form-group bg-white login-form mx-4 mt-3 mb-4 px-4 pt-1 pb-3">
                            <div className="py-3">
                                <div className="field">
                                    <input type="tel" id="phone" name="phone" required className="form-control px-3"></input>
                                    <label>Phone number</label>
                                </div>
                                <div className="field">
                                    <input type="password" id="pass" name="password" required className="form-control px-3 mt-4"></input>
                                    <label>Password</label>
                                </div>
                            </div>
                            <div className="my-1 field">
                                <button className="btn button mx-auto d-block bg-blue" type="submit">
                                    Log in
                                </button>
                            </div>
                        </form>
                        <h5 className="text-center dark-blue-faded">
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
                <div className="footer-title mb-3 pb-2 mx-auto fade-in">
                    <TitleSVG />
                </div>
            </>
        );
    } else {
        return <h2>Hello user, you are not logged in!</h2>;
    }
}
