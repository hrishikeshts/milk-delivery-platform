import React from "react";
import { Redirect } from "react-router-dom";
import TitleSVG from "../TitleSVG";
import "../styles/home.scss";
import { IoIosArrowForward } from "react-icons/io";

export default function DistributorHome({ status, data }) {
  if (status) {
    return (
      <>
        <div className="title-head">
          <div className="user-title">
            <h3 className="dark-blue Comfortaa">{data.name}</h3>
            <h6 className="dark-blue-faded">{data.region}</h6>
          </div>
          <div>
            <a
              href="/"
              onClick={() => {
                localStorage.clear();
              }}
            >
              Log out
            </a>
          </div>
        </div>
        <div className="light-bg center-container py-4 px-3 fade-in">
          <h3 className="blue">Next Delivery Info</h3>
          <div className="chart-box bg-white login-form">charts</div>
          <div className="items-container">
            <div className="items-box bg-white login-form px-3 py-2 orange">
              <h6 className="m-0">milk</h6>
              <h3>68</h3>
              <p>packs for</p>
              <p>
                <text>33</text> retailers
              </p>
            </div>

            <div className="items-box bg-white login-form px-3 py-2 blue">
              <h6 className="m-0">curd</h6>
              <h3>45</h3>
              <p>packs for</p>
              <p>
                <text>15</text> retailers
              </p>
            </div>

            <div className="items-box bg-white login-form px-3 py-2 green">
              <h6 className="m-0">curd</h6>
              <h3>33</h3>
              <p>packs for</p>
              <p>
                <text>2</text> retailers
              </p>
            </div>
          </div>

          <div className="mt-3 mb-2">
            <button className="btn button bg-blue px-3" type="submit">
              Share as Report
            </button>
          </div>

          <div className="mt-3 mb-2">
            <button className="btn bg-dark-blue py-2 pe-2 ps-3" type="submit">
              Start Delivering
              <div className="d-inline-block ps-5">
                <IoIosArrowForward size="18px" />
              </div>
            </button>
          </div>

          {/* <h2>Distributor Home</h2> */}
        </div>
        <div className="footer-title mb-3 pb-2 mx-auto fade-in">
          <TitleSVG />
        </div>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
}
