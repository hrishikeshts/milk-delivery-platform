import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TitleSVG from "../../TitleSVG";

export default function Status({ products, retailerCount, orders, orderCount }) {
    const confirmed = orders.length / products.length;
    const confirmedPercent = (orders.length / products.length / retailerCount.total) * 100;
    const orderedPercent = (retailerCount.ordered / retailerCount.total) * 100;
    return (
        <>
            <h3 className="blue fade-in">Next Delivery Info</h3>
            <div className="flex-grow-1 d-flex flex-column justify-content-evenly fade-in">
                {/* <div className="chart-box bg-white white-card">
                <div>Total Count: {orderCount.total}</div>
            </div> */}
                <div className="chart-box mx-auto">
                    <CircularProgressbarWithChildren
                        value={confirmedPercent}
                        styles={buildStyles({
                            pathColor: "#0080FF",
                            trailColor: "white",
                            pathTransitionDuration: 0.5,
                        })}
                    >
                        {/* Foreground path */}
                        <CircularProgressbarWithChildren
                            value={orderedPercent}
                            styles={buildStyles({
                                pathColor: "#003163",
                                trailColor: "transparent",
                                pathTransitionDuration: 0.5,
                            })}
                        >
                            <div>
                                <h2 className="m-0 order-items-number blue">{confirmed.toString()}</h2>
                                <h6 className="order-items-text mb-1">retailers confirmed</h6>
                                <h2 className="m-0 order-items-number dark-blue">{retailerCount.ordered}</h2>
                                <h6 className="order-items-text">retailers ordered</h6>
                            </div>
                        </CircularProgressbarWithChildren>
                    </CircularProgressbarWithChildren>
                </div>
                <div className="items-container flex-fill px-2">
                    {products.map((product, key) => {
                        return (
                            <div key={product.pid} className={`items-box white-card px-3 py-2 ${product.name}`}>
                                <h6 className="m-0 text-truncate">{product.name}</h6>
                                <h3>{orderCount[key + 1]}</h3>
                                <p>pack{orderCount[key + 1] === 1 ? "" : "s"} for</p>
                                <p>
                                    <span>{retailerCount[key + 1]}</span> retailer
                                    {retailerCount[key + 1] === 1 ? "" : "s"}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-3 mb-2">
                    {/* <button className="btn button bg-blue px-3" type="submit">
                            Share as Report
                        </button> */}
                </div>
            </div>
            <div>
                <div className="pt-3 pb-4 mb-1 fade-in">
                    <Link to="/delivery" className="dark-blue-btn btn bg-dark-blue py-2 pe-2 ps-3">
                        <span>
                            <div>Start Delivering</div>
                            <div>
                                <IoIosArrowForward size="18px" />
                            </div>
                        </span>
                    </Link>
                </div>
                <div className="footer-title mx-auto mb-2">
                    <TitleSVG color="#859BB0" />
                </div>
            </div>
        </>
    );
}
