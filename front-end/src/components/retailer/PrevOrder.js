import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { FiCheckCircle, FiXCircle, FiAlertCircle } from "react-icons/fi";
import { IoTimeOutline } from "react-icons/io5";
import { BiMessageDetail } from "react-icons/bi";
import TitleSVG from "../../TitleSVG";

export default function PrevOrder({ distributor, previous, isPlaced, setIsPlaced, hour }) {
    useEffect(() => {
        document.title = "Previous Order Summary – DairyDash";
    }, []);

    return (
        <>
            <h3 className="blue fade-in">Previous Order Summary</h3>
            {previous.result ? (
                <div className="flex-grow-1 d-flex flex-column justify-content-evenly fade-in">
                    <div className="my-1">
                        {previous.isDelivered === 2 ? (
                            <div>
                                <FiCheckCircle size="130px" className="green py-1" />
                                <h3 className="green pb-1">Delivered</h3>
                                <h5 className="dark-blue p-1 my-1">
                                    Your order has been delivered by {distributor.name}
                                </h5>
                            </div>
                        ) : previous.isDelivered === 0 ? (
                            <div>
                                <FiXCircle size="130px" className="red py-1" />
                                <h3 className="red pb-1">Not Delivered</h3>
                                <h5 className="dark-blue p-1 my-1">
                                    Your order could not be delivered by {distributor.name}
                                </h5>
                            </div>
                        ) : (
                            <div>
                                <IoTimeOutline size="150px" className="dark-blue-faded py-1" />
                                <h3 className="dark-blue-faded pb-1">Pending</h3>
                                <h5 className="dark-blue p-1 my-1">
                                    Your order is yet to be delivered by {distributor.name}
                                </h5>
                            </div>
                        )}
                    </div>
                    <div className="items-container px-2 pb-4">
                        {previous.result.map((product) => {
                            return (
                                <div key={product.pid} className={`items-box white-card ${product.name} px-2 py-2`}>
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
                        <a href={`tel:${distributor.phone}`} className="dark-blue call">
                            Call distributor
                        </a>
                    </h5>
                </div>
            ) : (
                <div className="flex-grow-1 d-flex flex-column justify-content-center mb-5 fade-in">
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
                </div>
            )}
            <div>
                <div className="pb-4 mb-1 fade-in">
                    {isPlaced === 0 ? (
                        <>
                            {hour === 18 ? (
                                <small className={`d-block py-2 small-text`}>
                                    <BiMessageDetail /> Place your order before 7pm!
                                </small>
                            ) : hour >= 19 || hour < 7 ? (
                                <small className={`d-block py-2 small-text`}>
                                    <BiMessageDetail /> Order can't be placed until after 7am!
                                </small>
                            ) : (
                                <small className={`d-block py-2 small-text invisible`}>&nbsp;</small>
                            )}
                            <Link
                                to="/order"
                                onClick={() => {
                                    if (isPlaced === 2) {
                                        setIsPlaced(1);
                                    }
                                }}
                                className={`dark-blue-btn btn bg-dark-blue py-2 pe-2 ps-3 
                                ${hour >= 19 || hour < 7 ? " disabled" : ""}`}
                            >
                                <span>
                                    <div>Place Next Order</div>
                                    <div>
                                        <IoIosArrowForward size="18px" />
                                    </div>
                                </span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <small className={`d-block py-2 small-text invisible`}>&nbsp;</small>
                            <Link
                                to="/order"
                                onClick={() => {
                                    if (isPlaced === 2) {
                                        setIsPlaced(1);
                                    }
                                }}
                                className={`dark-blue-btn btn bg-dark-blue py-2 pe-2 ps-3`}
                            >
                                <span>
                                    <div>Show Current Order</div>
                                    <div>
                                        <IoIosArrowForward size="18px" />
                                    </div>
                                </span>
                            </Link>
                        </>
                    )}
                </div>
                <div className="footer-title mx-auto mb-2">
                    <TitleSVG color="#859BB0" />
                </div>
            </div>
        </>
    );
}
