import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import RetailerCounter from "./RetailerCounter";
import TitleSVG from "../TitleSVG";
import { IoIosArrowForward } from "react-icons/io";

export default function RetailerHome({ status, data }) {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState({ total: 0 });
    const [price, setPrice] = useState({ total: 0 });
    const [isPlaced, setIsPlaced] = useState(false);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        axios
            .get("/products")
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch((err) => {
                console.error(err.response);
            });

        axios
            .get("/retailer/status/" + data.rid)
            .then((res) => {
                setIsPlaced(res.data.status);
                console.log(res.data.message);
                console.log(res.data);
                console.log(res.data.result);
                setOrder(res.data.result);
            })
            .catch((err) => {
                console.error(err.response);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isPlaced) {
            document.title = "Current Order Status – DairyDash";
        } else {
            document.title = "Place Upcoming Order – DairyDash";
        }
    }, [isPlaced]);

    useEffect(() => {
        products.map((product) => {
            return setCount((prevCount) => {
                return {
                    ...prevCount,
                    [product.pid]: 0,
                };
            });
        });
    }, [products]);

    useEffect(() => {
        products.map((product) => {
            return setPrice((prevCount) => {
                return {
                    ...prevCount,
                    [product.pid]: count[product.pid] * product.price,
                };
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    const placeOrder = (e) => {
        e.preventDefault();

        axios
            .post("/retailer/order/confirm", { count, price, rid: data.rid })
            .then((res) => {
                console.log("Retailer order sent to port 4000...");
                console.log(res.data);
                if (res.status) {
                    setIsPlaced(true);
                }
            })
            .catch((err) => {
                console.error(err.response.data);
            });
    };

    if (status) {
        return (
            <>
                <div className='title-head'>
                    <div className='user-title'>
                        <h3 className='dark-blue Comfortaa'>{data.name}</h3>
                        <h6 className='dark-blue-faded'>{data.region}</h6>
                    </div>
                    <div>
                        <a
                            href='/login/retailer'
                            onClick={() => {
                                localStorage.clear();
                            }}
                        >
                            Log out
                        </a>
                    </div>
                </div>
                <div className='light-bg center-container py-4 px-3 fade-in'>
                    {isPlaced ? (
                        <>
                            <h3 className='blue'>Current Order Status</h3>
                            {order
                                ? order.map((product) => {
                                      return (
                                          <div key={product.pid}>
                                              {product.name}&nbsp;
                                              {product.count}
                                          </div>
                                      );
                                  })
                                : products.map((product, key) => {
                                      return (
                                          <div key={product.pid}>
                                              {product.name}&nbsp;
                                              {count[key + 1]}
                                          </div>
                                      );
                                  })}
                        </>
                    ) : (
                        <RetailerCounter
                            products={products}
                            count={count}
                            setCount={setCount}
                            price={price}
                            setPrice={setPrice}
                            placeOrder={placeOrder}
                        />
                    )}

                    <div className='mt-3 mb-2'>
                        <button
                            className='btn bg-dark-blue py-2 pe-2 ps-3'
                            type='submit'
                        >
                            Show Previous Order
                            <div className='d-inline-block ps-5'>
                                <IoIosArrowForward size='18px' />
                            </div>
                        </button>
                    </div>
                </div>
                <div className='footer-title mb-3 pb-2 mx-auto fade-in'>
                    <TitleSVG />
                </div>
            </>
        );
    } else {
        return <Redirect to='/' />;
    }
}
