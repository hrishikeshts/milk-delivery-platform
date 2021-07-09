import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import TitleSVG from "../TitleSVG";

export default function RetailerHome({ status, data }) {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState({ total: 0 });
    const [price, setPrice] = useState({ total: 0 });

    useEffect(() => {
        axios
            .get("products")
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch((err) => {
                console.error(err.response);
            });
    }, []);

    useEffect(() => {
        products.map((product) => {
            return setCount((prevCount) => {
                return {
                    ...prevCount,
                    [product.name]: 0,
                };
            });
        });
    }, [products]);

    useEffect(() => {
        products.map((product) => {
            return setPrice((prevCount) => {
                return {
                    ...prevCount,
                    [product.name]: count[product.name] * product.price,
                };
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    const confirmOrder = (e) => {
        e.preventDefault();

        axios
            .post("/retailer/order/confirm", { count, price })
            .then((res) => {
                console.log("Retailer order sent to port 4000...");
            })
            .catch((err) => {
                console.error(err.response);
            });
    };

    if (status) {
        return (
            <>
                <h3>{data.name}</h3>
                {data.region}
                <a
                    href='/'
                    onClick={() => {
                        localStorage.clear();
                    }}
                >
                    Log out
                </a>
                <div className='light-bg form-container py-4 px-3 fade-in'>
                    <h2>Retailer Home</h2>
                    {products.map((product) => {
                        return (
                            <div key={product.pid}>
                                {product.name}
                                <button
                                    className='btn button bg-blue'
                                    onClick={() => {
                                        if (count[product.name] > 0) {
                                            setCount((prevCount) => {
                                                return {
                                                    ...prevCount,
                                                    [product.name]:
                                                        prevCount[
                                                            product.name
                                                        ] - 1,
                                                    total: prevCount.total - 1,
                                                };
                                            });
                                            setPrice((prevPrice) => {
                                                return {
                                                    ...prevPrice,
                                                    total:
                                                        prevPrice.total -
                                                        product.price,
                                                };
                                            });
                                        }
                                    }}
                                >
                                    -
                                </button>
                                <span>{count[product.name]}</span>
                                &nbsp;
                                <span>{price[product.name]}</span>
                                <button
                                    className='btn button bg-blue'
                                    onClick={() => {
                                        setCount((prevCount) => {
                                            return {
                                                ...prevCount,
                                                [product.name]:
                                                    prevCount[product.name] + 1,
                                                total: prevCount.total + 1,
                                            };
                                        });
                                        setPrice((prevPrice) => {
                                            return {
                                                ...prevPrice,
                                                total:
                                                    prevPrice.total +
                                                    product.price,
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
                    <div>{price.total}</div>
                    <button
                        className='btn button bg-blue'
                        onClick={confirmOrder}
                    >
                        Confirm
                    </button>
                </div>
                <div className='login-title footer-title mb-3 pb-2 mx-auto fade-in'>
                    <TitleSVG />
                </div>
            </>
        );
    } else {
        return <Redirect to='/' />;
    }
}
