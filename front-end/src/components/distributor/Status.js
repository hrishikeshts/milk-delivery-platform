import React, { useEffect } from "react";
// import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BiMessageDetail } from "react-icons/bi";
import TitleSVG from "../../TitleSVG";

export default function Status({
    hour,
    products,
    retailerCount,
    orders,
    orderCount,
    deliveryHour,
    setDeliveryHour,
    data,
    socket,
    update,
    setUpdate,
}) {
    // const [prompt, setPrompt] = useState("");

    const confirmed = orders.length / products.length;
    const confirmedPercent = (orders.length / products.length / retailerCount.total) * 100;
    const orderedPercent = (retailerCount.ordered / retailerCount.total) * 100;

    useEffect(() => {
        document.title = `${hour >= 12 ? "Upcoming " : ""}Delivery Summary – DairyDash`;
    });

    // let flag = false;
    const endDelivery = (e) => {
        e.preventDefault();

        // if (flag) {
        console.log("Ending the delivery...");

        setDeliveryHour(3);

        socket.emit("delivery", "Delivery status set for all orders");
        axios
            .post(`/d${data.did}/end-delivery`, {
                region: data.region,
            })
            .then((res) => {
                console.log(res.data.message);
                setDeliveryHour(3);
            })
            .catch((err) => {
                console.error(err.response);
            });
        // }
        // setPrompt('This will mark all pending deliveries as "Not Delivered"');
        // flag = true;
    };

    const prevDelivery = (e) => {
        e.preventDefault();
        setDeliveryHour(4);
    };

    return (
        <>
            <h3 className="blue fade-in">{hour >= 12 ? "Upcoming " : ""}Delivery Summary</h3>
            <div className="flex-grow-1 d-flex flex-column justify-content-evenly fade-in">
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
                                <h6 className="order-items-text mb-1">
                                    retailer{confirmed === 1 ? "" : "s"} confirmed
                                </h6>
                                <h2 className="m-0 order-items-number dark-blue">{retailerCount.ordered}</h2>
                                <h6 className="order-items-text">
                                    retailer{retailerCount.ordered === 1 ? "" : "s"} ordered
                                </h6>
                            </div>
                        </CircularProgressbarWithChildren>
                    </CircularProgressbarWithChildren>
                </div>
                <div className="items-container flex-fill px-2 pb-2">
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
                {deliveryHour === 2 || deliveryHour === 4 ? (
                    <div className="mt-3 mb-1">
                        <button className="blue-btn btn button bg-blue px-4" onClick={endDelivery}>
                            End Delivery
                        </button>
                    </div>
                ) : deliveryHour === 3 ? (
                    <div className="mt-3 mb-1">
                        <button className="blue-btn btn button bg-blue px-4" onClick={prevDelivery}>
                            Previous Delivery
                        </button>
                    </div>
                ) : (
                    <div className="mt-3 mb-2"></div>
                )}
            </div>
            <div>
                <div className="pb-4 mb-1 fade-in">
                    {/* {prompt ? (
                        <small className={`d-block py-2`}>{prompt}</small>
                    ) : hour === 11 ? ( */}
                    {hour === 11 ? (
                        <small className={`d-block py-2 small-text`}>
                            <BiMessageDetail /> Finish your delivery before 12pm!
                        </small>
                    ) : deliveryHour === 2 ? (
                        <small className={`d-block py-2 small-text`}>
                            <BiMessageDetail /> End Delivery will mark all pending deliveries as "Not Delivered"
                        </small>
                    ) : (
                        <small className={`d-block pt-1 pb-2 small-text invisible`}>&nbsp;</small>
                    )}
                    <Link to="/delivery" className="dark-blue-btn btn bg-dark-blue py-2 pe-2 ps-3">
                        <span>
                            <div>Show Delivery Details</div>
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
