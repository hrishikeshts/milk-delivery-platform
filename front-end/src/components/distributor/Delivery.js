import React from "react";
import { Link } from "react-router-dom";
import DeliverySelect from "./DeliverySelect";
import { IoIosArrowForward } from "react-icons/io";
import { FaDotCircle } from "react-icons/fa";

export default function Delivery({ products, retailers, orderDetails, orders, orderCount }) {
    return (
        <>
            <h3 className="blue">Delivery Status</h3>
            <div className="overflow-auto">
                <div className="product-chart-box">
                    {products.map((product, key) => {
                        return (
                            <div key={product.pid} className={`${product.name}`}>
                                <h6 className="m-0">{product.name}</h6>
                                <h3>{orderCount[key + 1]}</h3>
                            </div>
                        );
                    })}
                </div>
                <div className="items-order-container">
                    {orderDetails.map((orderDetail, key) => {
                        return (
                            <div key={orderDetail.oid} className="stores-order-box bg-white py-2 px-3">
                                <div className="d-flex justify-content-between mb-2">
                                    <h5 className="store-name dark-blue px-2 pt-2 text-truncate">
                                        {retailers[key].name}
                                    </h5>
                                    <h3 className="fw-bolder dark-blue m-0 pt-1 px-1">₹{orderDetail.amount + ".00"}</h3>
                                </div>

                                {/* <div>{retailers[key].phone}</div> */}
                                <div className="px-2 py-1 d-flex justify-content-between">
                                    <div className="d-flex me-2">
                                        {orders
                                            .filter((filtered) => filtered.oid === orderDetail.oid)
                                            .map((order) => {
                                                return (
                                                    <div
                                                        key={order.pid}
                                                        className={
                                                            "d-inline-block pe-2 ps-1 d-flex align-items-center "
                                                        }
                                                    >
                                                        <FaDotCircle size="15px" />
                                                        &nbsp;
                                                        <h3 className="m-0 fw-bolder d-inline-block">{order.count}</h3>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                    <div className="flex-fill">
                                        {/* xxx */}
                                        <DeliverySelect oid={orderDetail.oid} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-3 mb-2">
                <Link to="/" className="btn bg-dark-blue py-2 pe-2 ps-3">
                    End Delivering
                    <div className="d-inline-block ps-5">
                        <IoIosArrowForward size="18px" />
                    </div>
                </Link>
            </div>
        </>
    );
}
