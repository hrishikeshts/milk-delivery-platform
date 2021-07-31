import React from "react";
import { Link } from "react-router-dom";
import DeliverySelect from "./DeliverySelect";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FaDotCircle } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { IoIosCall } from "react-icons/io";
import TitleSVG from "../../TitleSVG";

export default function Delivery({
    products,
    retailers,
    orderDetails,
    orders,
    orderCount,
    socket,
    hour,
    deliveryHour,
}) {
    return (
        <>
            <h3 className="blue fade-in">{hour >= 12 ? "Upcoming " : ""}Delivery Details</h3>
            <div className="delivery-container flex-grow-1 fade-in">
                <div className="product-chart-box">
                    {products.map((product, key) => {
                        return (
                            <div key={product.pid} className={`${product.name} col`}>
                                <h6 className="m-0">{product.name}</h6>
                                <h3>{orderCount[key + 1]}</h3>
                            </div>
                        );
                    })}
                </div>
                <div className="items-order-container pb-2">
                    {orderDetails
                        .filter((orderDetail) => orderDetail.amount > 0)
                        .map((orderDetail, key) => {
                            const retailer = retailers.filter((retailer) => retailer.rid === orderDetail.rid)[0];
                            return (
                                <div key={orderDetail.oid} className="stores-order-box bg-white py-2 px-3 m-2">
                                    <div className="d-flex justify-content-between align-items-end overflow-hidden">
                                        <div className="pt-1">
                                            <h5
                                                className="store-name dark-blue text-start collapsed"
                                                data-toggle="collapse"
                                                href={`#collapse-${key}`}
                                                role="button"
                                                aria-expanded="false"
                                                aria-controls={`collapse-${key}`}
                                            >
                                                <IoIosArrowForward className="arrow-forward" />
                                                <IoIosArrowDown className="arrow-down" />
                                                {retailer.name}
                                            </h5>
                                            <div className="collapse text-start px-3" id={`collapse-${key}`}>
                                                <a href={`tel:${retailer.phone}`} className="store-call dark-blue">
                                                    <IoIosCall />
                                                    {retailer.phone}
                                                </a>
                                            </div>
                                        </div>
                                        <h3 className="fw-bolder dark-blue m-0 px-1 bg-white rounded">
                                            ₹{orderDetail.amount.toFixed(2)}
                                        </h3>
                                    </div>
                                    <div className="ps-2 pe-1 py-1 d-flex justify-content-between">
                                        <div className="d-flex me-2">
                                            {products.length > 0 ? (
                                                orders
                                                    .filter((filtered) => filtered.oid === orderDetail.oid)
                                                    .map((order, key) => {
                                                        // console.log(products[key]);
                                                        return (
                                                            <div
                                                                key={order.pid}
                                                                className={`d-inline-block pe-2 ps-1 d-flex align-items-center ${products[key].name}`}
                                                            >
                                                                <FaDotCircle size="15px" />
                                                                &nbsp;
                                                                <h3 className="m-0 fw-bolder d-inline-block">
                                                                    {order.count}
                                                                </h3>
                                                            </div>
                                                        );
                                                    })
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        {deliveryHour === 1 || deliveryHour === 2 || deliveryHour === 4 ? (
                                            <DeliverySelect orderDetail={orderDetail} socket={socket} />
                                        ) : (
                                            <small className={`d-block py-2 small-text`}>
                                                <BiMessageDetail /> Not delivery hours!
                                            </small>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div>
                <div className="pb-4 mb-1 fade-in">
                    <small className={`d-block py-2 small-text${hour === 11 ? "" : " invisible"}`}>
                        <BiMessageDetail /> Finish your delivery before 12pm!
                    </small>
                    <Link to="/" className="dark-blue-btn btn bg-dark-blue py-2 pe-2 ps-3">
                        <span>
                            <div>Show Delivery Summary</div>
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
