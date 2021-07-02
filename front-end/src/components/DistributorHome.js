import React from "react";
import { Redirect } from "react-router-dom";
import TitleSVG from "../TitleSVG";
import "../styles/home.scss";

export default function DistributorHome({ status, data }) {
    if (status) {
        return (
            <>
                <h3>{data.name}</h3>
                {data.region}
                <a
                    href='/'
                    onClick={() => {
                        localStorage.clear();
                    }}
                >
                    Log out
                </a>
                <div className='light-bg form-container py-4 px-3 fade-in'>
                    <h2>Distributor Home</h2>
                </div>
                <div className='login-title footer-title mb-3 pb-2 mx-auto fade-in'>
                    <TitleSVG />
                </div>
            </>
        );
    } else {
        return <Redirect to='/' />;
    }
}
