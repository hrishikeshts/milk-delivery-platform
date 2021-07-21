import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import TitleSVG from "../../TitleSVG";

export default function CurrentOrder({ order, products, count, isPlaced, setIsPlaced }) {
    useEffect(() => {
        document.title = "Current Order Summary – DairyDash";
    }, []);

    return (
        <>
            <h3 className="blue">Current Order Summary</h3>
            <div className="flex-grow-1 d-flex flex-column justify-content-evenly fade-in">
                <div className="items-order-container">
                    {order
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
                <div className="pt-3 pb-4 mb-1 fade-in">
                    {isPlaced === 1 ? (
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
                    ) : (
                        <>
                            <h5 className="p-2 mb-2">Your order has already been updated!</h5>
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
