import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";

export default function PlaceOrder({ data, products, count, setCount, price, setPrice, isPlaced, setIsPlaced, order }) {
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
                console.error(err.response);
            });
    };

    return (
        <>
            <h3 className='blue'>{isPlaced === 0 ? "Place Upcoming Order" : "Edit Current Order"}</h3>
            {products.map((product) => {
                return (
                    <div key={product.pid}>
                        {product.name}
                        <button
                            className='btn button bg-blue'
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
                            -
                        </button>
                        <span>{count[product.pid]}</span>
                        &nbsp;
                        <span>₹{price[product.pid]}</span>
                        <button
                            className='btn button bg-blue'
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
                            +
                        </button>
                    </div>
                );
            })}
            <div>{count.total}</div>
            <div>₹{price.total}</div>
            <div className='mt-3 mb-2'>
                <button className='btn button bg-blue px-3' onClick={placeOrder}>
                    Confirm
                </button>
            </div>
            <div className='mt-3 mb-2'>
                <Link to='/' className='btn bg-dark-blue py-2 pe-2 ps-3' type='submit'>
                    Show Previous Order
                    <div className='d-inline-block ps-5'>
                        <IoIosArrowForward size='18px' />
                    </div>
                </Link>
            </div>
        </>
    );
}