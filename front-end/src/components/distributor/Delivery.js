import React from "react";
import { Link } from "react-router-dom";
import DeliverySelect from "./DeliverySelect";
import { IoIosArrowForward } from "react-icons/io";
import { FaDotCircle } from "react-icons/fa";
import TitleSVG from "../../TitleSVG";

export default function Delivery({ products, retailers, orderDetails, orders, orderCount, socket }) {
    return (
        <>
            <h3 className="blue fade-in">Delivery Status</h3>
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
                        .map((orderDetail) => {
                            const key = orderDetail.rid - 1;
                            return (
                                <div key={orderDetail.oid} className="stores-order-box bg-white pt-2 pb-1 px-3 m-2">
                                    <div className="d-flex justify-content-between mb-2">
                                        <h5 className="store-name dark-blue px-2 pt-2 text-truncate">
                                            {retailers[key].name}
                                        </h5>
                                        <h3 className="fw-bolder dark-blue m-0 pt-1 px-1">
                                            ₹{orderDetail.amount.toString() + ".00"}
                                        </h3>
                                    </div>

                                    {/* <div>{retailers[key].phone}</div> */}
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
                                        <DeliverySelect oid={orderDetail.oid} socket={socket} />
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div>
                <div className="pt-3 pb-4 mb-1 fade-in">
                    <Link to="/" className="dark-blue-btn btn bg-dark-blue py-2 pe-2 ps-3">
                        <span>
                            <div>End Delivering</div>
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
