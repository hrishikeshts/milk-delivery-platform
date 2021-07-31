import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import { BiMessageDetail } from "react-icons/bi";
import TitleSVG from "../../TitleSVG";

export default function PlaceOrder({
    data,
    products,
    count,
    setCount,
    price,
    setPrice,
    isPlaced,
    setIsPlaced,
    order,
    previous,
    socket,
    hour,
}) {
    const [small, setSmall] = useState("");

    useEffect(() => {
        if (isPlaced === 0) {
            document.title = "Place Upcoming Order – DairyDash";
        } else {
            document.title = "Edit Current Order – DairyDash";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const placeOrder = (e) => {
        e.preventDefault();
        socket.emit("order", "Order request by " + data.rid);

        axios
            .post(`/r${data.rid}/order${isPlaced === 2 ? "/edit" : ""}`, {
                count,
                price,
                rid: data.rid,
                prevOrder: order ? order : products,
            })
            .then((res) => {
                console.log("Retailer order sent...");
                console.log(res.data.message);
                setIsPlaced(res.data.isPlaced);
            })
            .catch((err) => {
                console.error(err.response.data);
                setSmall(err.response.data);
            });
    };

    return (
        <>
            <h3 className="blue fade-in">{isPlaced === 0 ? "Place Upcoming Order" : "Edit Current Order"}</h3>
            <div className="flex-grow-1 d-flex flex-column justify-content-evenly fade-in">
                <div className="items-order-container">
                    {products.map((product) => {
                        return (
                            <div key={product.pid} className="items-order-box bg-white my-2 py-2">
                                <h4 className={"mb-2 " + product.name}>{product.name}</h4>
                                <div className="items-button-box mb-1">
                                    <button
                                        className={"btn button bg-blue p-0 bg-" + product.name.replaceAll(" ", "")}
                                        onClick={() => {
                                            if (count[product.pid] > 0) {
                                                setCount((prevCount) => {
                                                    return {
                                                        ...prevCount,
                                                        [product.pid]: prevCount[product.pid] - 1,
                                                        total: prevCount.total - 1,
                                                    };
                                                });
                                                setPrice((prevPrice) => {
                                                    return {
                                                        ...prevPrice,
                                                        total: prevPrice.total - product.price,
                                                    };
                                                });
                                            }
                                        }}
                                    >
                                        <h4>-</h4>
                                    </button>
                                    <h3 className={"my-0 mx-2 px-1 py-1 border-" + product.name.replaceAll(" ", "")}>
                                        {count[product.pid]}
                                    </h3>
                                    {/* <span>{count[product.pid]}</span> */}
                                    {/* &nbsp; */}
                                    {/* <span>₹{price[product.pid]}</span> */}
                                    <button
                                        className={"btn button bg-blue p-0 bg-" + product.name.replaceAll(" ", "")}
                                        onClick={() => {
                                            setCount((prevCount) => {
                                                return {
                                                    ...prevCount,
                                                    [product.pid]: prevCount[product.pid] + 1,
                                                    total: prevCount.total + 1,
                                                };
                                            });
                                            setPrice((prevPrice) => {
                                                return {
                                                    ...prevPrice,
                                                    total: prevPrice.total + product.price,
                                                };
                                            });
                                        }}
                                    >
                                        <h4>+</h4>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* <div>{count.total}</div> */}
                <h5 className="total-text my-1">Total</h5>
                <div>
                    <h3 className="m-0 fw-normal dark-blue">₹{price.total.toFixed(2)}</h3>
                </div>
                <div className="mt-1 mb-2">
                    <button className="blue-btn btn button bg-blue px-4" onClick={placeOrder}>
                        Confirm
                    </button>
                </div>
            </div>
            <div>
                <div className="pb-4 mb-1 fade-in">
                    <small className={`d-block py-2 small-text${small ? "" : " invisible"}`}>
                        <BiMessageDetail /> {small}
                    </small>
                    {previous ? (
                        <Link to="/" className="dark-blue-btn btn bg-dark-blue py-2 pe-2 ps-3">
                            <span>
                                <div>Show Previous Order</div>
                                <div>
                                    <IoIosArrowForward size="18px" />
                                </div>
                            </span>
                        </Link>
                    ) : (
                        <button
                            className="dark-blue-btn btn bg-dark-blue py-2 pe-2 ps-3"
                            type="submit"
                            onClick={() => {
                                setIsPlaced(1);
                            }}
                        >
                            <span>
                                <div>Show Current Order</div>
                                <div>
                                    <IoIosArrowForward size="18px" />
                                </div>
                            </span>
                        </button>
                    )}
                </div>
                <div className="footer-title mx-auto mb-2">
                    <TitleSVG color="#859BB0" />
                </div>
            </div>
        </>
    );
}
