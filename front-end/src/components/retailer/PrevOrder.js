import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { FiCheckCircle, FiXCircle, FiAlertCircle } from "react-icons/fi";

export default function PrevOrder({ distributor, previous, isPlaced, setIsPlaced }) {
    useEffect(() => {
        document.title = "Previous Order Summary – DairyDash";
    }, []);

    return (
        <>
            <h3 className="blue">Previous Order Summary</h3>
            {previous.result ? (
                <>
                    <div className="my-1">
                        {previous.isDelivered === 2 ? (
                            <div>
                                <FiCheckCircle size="130px" className="green py-1" />
                                <h5 className="dark-blue p-1 my-1">
                                    Your order has been delivered by {distributor.name}
                                </h5>
                            </div>
                        ) : previous.isDelivered === 0 ? (
                            <div>
                                <FiXCircle size="130px" className="red py-1" />
                                <h5 className="dark-blue p-1 my-1">
                                    Your order could not be delivered by {distributor.name}
                                </h5>
                            </div>
                        ) : (
                            <div>
                                <FiAlertCircle size="130px" className="dark-blue-faded py-1" />
                                <h5 className="dark-blue p-1 my-1">
                                    Your order is yet to be delivered by {distributor.name}
                                </h5>
                            </div>
                        )}
                    </div>

                    <div className="items-container">
                        {previous.result.map((product) => {
                            return (
                                <div
                                    key={product.pid}
                                    className={`items-box bg-white login-form ${product.name} px-2 py-2`}
                                >
                                    <h6 className="m-0 text-truncate">{product.name}</h6>
                                    <h3>{product.count}</h3>
                                    <p>pack{product.count === 1 ? "" : "s"}</p>
                                </div>
                            );
                        })}
                    </div>
                    <h5 className="text-center dark-blue-faded px-1">
                        Haven’t received your order?
                        <br />
                        <a href={`tel: ${distributor.phone}`} className="dark-blue call">
                            Call distributor
                        </a>
                    </h5>
                </>
            ) : (
                <>
                    <div className="my-1 py-1">
                        <FiAlertCircle size="130px" className="dark-blue-faded py-1" />
                    </div>
                    <h5 className="dark-blue p-1 my-1">No previous orders exists!</h5>
                    <h5 className="text-center dark-blue-faded px-1 py-2">
                        Have any queries for your distributor?
                        <br />
                        <a href={`tel: ${distributor.phone}`} className="dark-blue call">
                            Call distributor
                        </a>
                    </h5>
                </>
            )}
            <div className="mt-3 mb-2">
                <Link
                    to="/order"
                    onClick={() => {
                        if (isPlaced === 2) {
                            setIsPlaced(1);
                        }
                    }}
                    className="btn bg-dark-blue py-2 pe-2 ps-3"
                    type="submit"
                >
                    {isPlaced === 0 ? "Place Next Order" : "Show Current Order"}
                    <div className="d-inline-block ps-5">
                        <IoIosArrowForward size="18px" />
                    </div>
                </Link>
            </div>
        </>
    );
}
