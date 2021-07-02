import React from "react";
import { Redirect } from "react-router-dom";
import TitleSVG from "../TitleSVG";

export default function RetailerHome({ status, data }) {
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
                    <h2>Retailer Home</h2>
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
