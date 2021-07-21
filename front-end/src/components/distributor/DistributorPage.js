import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import Status from "./Status";
import Delivery from "./Delivery";
import "../../styles/distributor.scss";
import Hamburger from "../../assets/hamburger.svg";

export default function DistributorPage({ status, data }) {
    const [products, setProducts] = useState([]);
    const [retailers, setRetailers] = useState([]);
    const [retailerCount, setRetailerCount] = useState({});
    const [orderDetails, setOrderDetails] = useState([]);
    const [orders, setOrders] = useState([]);
    const [orderCount, setOrderCount] = useState({ total: 0 });

    useEffect(() => {
        document.title = "Next Delivery Info – DairyDash";
        // console.log(data);

        axios
            .get(`/${data.did}/products`)
            .then((res) => {
                // console.log(res.data);
                setProducts(res.data);
            })
            .catch((err) => {
                console.error(err.response);
            });

        axios
            .get(`/d${data.did}/status`)
            .then((res) => {
                // console.log(res.data);
                setRetailerCount((prevCount) => {
                    return {
                        ...prevCount,
                        total: res.data.retailers.length,
                    };
                });
                setRetailers(res.data.retailers);
                setOrderDetails(res.data.orderDetails);
                setOrders(res.data.orders);
            })
            .catch((err) => {
                console.error(err.response);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        products.map((product) => {
            setOrderCount((prevCount) => {
                return {
                    ...prevCount,
                    [product.pid]: 0,
                };
            });
            return setRetailerCount((prevCount) => {
                return {
                    ...prevCount,
                    [product.pid]: 0,
                };
            });
        });

        if (orders.length > 0) {
            var totalCount = orders.reduce((prev, cur) => prev + cur.count, 0);
            setOrderCount((prevCount) => {
                return { ...prevCount, total: totalCount };
            });

            orders.map((order) => {
                setOrderCount((prevCount) => {
                    return { ...prevCount, [order.pid]: prevCount[order.pid] + order.count };
                });
                return setRetailerCount((prevCount) => {
                    return { ...prevCount, [order.pid]: prevCount[order.pid] + (order.count > 0) };
                });
            });
        }
    }, [orders, products]);

    useEffect(() => {
        setRetailerCount((prevCount) => {
            return {
                ...prevCount,
                ordered: orderDetails.filter((orderDetail) => orderDetail.amount > 0).length,
            };
        });
    }, [orderDetails]);

    const props = { products, retailers, retailerCount, orderDetails, orders, orderCount };

    if (status) {
        return (
            <div className="home fade-in">
                <div className="title-head">
                    <div className="user-title">
                        <h3 className="dark-blue Comfortaa text-truncate">{data.name}</h3>
                        <h6 className="dark-blue-faded text-truncate">{data.region}</h6>
                    </div>
                    <div className="dropdown">
                        <button
                            className="btn dropdown-toggle p-2"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <img src={Hamburger} alt="Menu" />
                        </button>
                        <div
                            className="dropdown-menu dropdown-menu-right white-card shadow-btn"
                            aria-labelledby="dropdownMenuButton"
                        >
                            <div className="d-flex flex-column align-items-center">
                                <a
                                    href="/login/distributor"
                                    onClick={() => {
                                        localStorage.clear();
                                    }}
                                    className="w-100 text-center text-decoration-none"
                                >
                                    Log out
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="light-bg center-container pt-4 px-2 flex-fill">
                    <Switch>
                        <Route path="/" exact>
                            <Status {...props} />
                        </Route>
                        <Route path="/delivery" exact>
                            <Delivery {...props} />
                        </Route>
                        <Route path="/deliver*">
                            <Redirect to="/delivery" />
                        </Route>
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </div>
            </div>
        );
    } else {
        return <Redirect to="/" />;
    }
}
