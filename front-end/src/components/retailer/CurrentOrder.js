import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { BiMessageDetail } from "react-icons/bi";
import TitleSVG from "../../TitleSVG";

export default function CurrentOrder({ hour, order, products, count, isPlaced, setIsPlaced }) {
    useEffect(() => {
        document.title = "Current Order Summary – DairyDash";
    }, []);

    return (
        <>
            <h3 className="blue fade-in">Current Order Summary</h3>
            <div className="flex-grow-1 d-flex flex-column justify-content-evenly fade-in">
                <div className="items-order-container">
                    {order && isPlaced === 1
                        ? order.map((product) => {
                              return (
                                  <div key={product.pid} className="items-order-box bg-white my-2 pt-2 pb-3">
                                      <h4 className={"m-1 " + product.name}>{product.name}</h4>
                                      <h3 className={"my-0 mx-2 px-1 py-1 " + product.name}>{product.count}</h3>
                                  </div>
                              );
                          })
                        : products.map((product, key) => {
                              return (
                                  <div key={product.pid} className="items-order-box bg-white my-2 pt-2 pb-3">
                                      <h4 className={"m-1 " + product.name}>{product.name}</h4>
                                      <h3 className={"my-0 mx-2 px-1 py-1 " + product.name}>{count[key + 1]}</h3>
                                  </div>
                              );
                          })}
                </div>
            </div>
            <div>
                <div className="pb-4 mb-1 fade-in">
                    {isPlaced === 1 && hour < 19 && hour >= 7 ? (
                        <>
                            <small className={`d-block py-2 small-text`}>
                                <BiMessageDetail /> Your order can be edited once before 7pm!
                            </small>
                            <button
                                className="dark-blue-btn btn bg-dark-blue py-2 pe-2 ps-3"
                                type="submit"
                                onClick={() => {
                                    setIsPlaced(2);
                                }}
                            >
                                <span>
                                    <div>Edit Current Order</div>
                                    <div>
                                        <IoIosArrowForward size="18px" />
                                    </div>
                                </span>
                            </button>
                        </>
                    ) : (
                        <>
                            <small className={`d-block py-2 small-text`}>
                                <BiMessageDetail />
                                {isPlaced === 3
                                    ? " Your order has already been edited!"
                                    : hour >= 19 || hour < 7
                                    ? " Your order can't be edited anymore!"
                                    : ""}
                            </small>
                            <Link to="/" className="dark-blue-btn btn bg-dark-blue py-2 pe-2 ps-3" type="submit">
                                <span>
                                    <div>Show Previous Order</div>
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
