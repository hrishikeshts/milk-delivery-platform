import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import Status from "./Status";
import Delivery from "./Delivery";
import "../../styles/distributor.scss";
import Hamburger from "../../assets/hamburger.svg";
import TitleSVG from "../../TitleSVG";

export default function DistributorPage({
    loadingTime,
    loadingData,
    setLoadingData,
    socket,
    hour,
    status,
    data,
    setHour,
}) {
    const [products, setProducts] = useState([]);
    const [retailers, setRetailers] = useState([]);
    const [retailerCount, setRetailerCount] = useState({});
    const [prevOrderDetails, setPrevOrderDetails] = useState([]);
    const [prevOrders, setPrevOrders] = useState([]);
    const [curOrderDetails, setCurOrderDetails] = useState([]);
    const [curOrders, setCurOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [orders, setOrders] = useState([]);
    const [orderCount, setOrderCount] = useState({ total: 0 });
    const [update, setUpdate] = useState(false);
    const [deliveryHour, setDeliveryHour] = useState(0);

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            socket.on("order", (message) => {
                console.log(message);
                setTimeout(() => {
                    setUpdate(!update);
                });
            });
        }

        return function cleanup() {
            mounted = false;
            socket.off("order");
        };
    });

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            axios
                .get(`/${data.did}/products`)
                .then((res) => {
                    // console.log(res.data);
                    setLoadingData(loadingData++);
                    setProducts(res.data);
                })
                .catch((err) => {
                    console.error(err.response);
                });

            axios
                .get(`/d${data.did}/status`)
                .then((res) => {
                    // console.log(res.data);
                    setLoadingData(loadingData++);
                    setRetailerCount((prevCount) => {
                        return {
                            ...prevCount,
                            total: res.data.retailers.length,
                        };
                    });
                    setRetailers(res.data.retailers);
                    setPrevOrderDetails(res.data.prevOrderDetails);
                    setPrevOrders(res.data.prevOrders);
                    setCurOrderDetails(res.data.curOrderDetails);
                    setCurOrders(res.data.curOrders);
                })
                .catch((err) => {
                    console.error(err.response);
                });
        }

        return function cleanup() {
            mounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, update]);

    useEffect(() => {
        if (hour < 12) {
            if (hour < 7) {
                console.log("Delivery hour started!");
                setDeliveryHour(1);
            } else {
                if (prevOrderDetails.length > 0) {
                    if (prevOrderDetails.filter((orderDetail) => orderDetail.isDelivered === null).length > 0) {
                        console.log("It is Delivery Hours!");
                        setDeliveryHour(2);
                    } else {
                        console.log("Delivery has finished!");
                        if (deliveryHour !== 4) setDeliveryHour(3);
                        if (deliveryHour === 2) setDeliveryHour(3);
                    }
                }
            }
        } else {
            console.log("Not Delivery Hours!");
            setDeliveryHour(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hour, prevOrderDetails, curOrderDetails, curOrders, prevOrders]);

    useEffect(() => {
        if (deliveryHour === 0 || deliveryHour === 3) {
            setOrderDetails(curOrderDetails);
            setOrders(curOrders);
        } else if (deliveryHour === 1 || deliveryHour === 2 || deliveryHour === 4) {
            setOrderDetails(prevOrderDetails);
            setOrders(prevOrders);
        }
    }, [curOrderDetails, curOrders, deliveryHour, prevOrderDetails, prevOrders]);

    // useEffect(() => {
    //     if (hour < 12) {
    //         if (hour < 7) {
    //             console.log("Delivery hour started!");
    //             setDeliveryHour(1);
    //         } else if (orderDetails.length > 0) {
    //             if (orderDetails.filter((orderDetail) => orderDetail.isDelivered === null).length > 0) {
    //                 console.log("It is Delivery Hours!");
    //                 setDeliveryHour(2);
    //             } else {
    //                 console.log("Delivery has finished!");
    //                 if (deliveryHour !== 4) {
    //                     setDeliveryHour(3);
    //                 }
    //             }
    //         } else {
    //             console.log("Else case!");
    //             setDeliveryHour(2);
    //         }
    //         // } else {
    //         //     console.log("Not Delivery Hours!");
    //         //     setDeliveryHour(0);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [hour, orderDetails]);

    useEffect(() => {
        console.log(deliveryHour);
    }, [deliveryHour]);

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

    const props = {
        products,
        retailers,
        retailerCount,
        orderDetails,
        orders,
        orderCount,
        socket,
        hour,
        deliveryHour,
        setDeliveryHour,
        setHour,
        data,
        update,
        setUpdate,
    };

    if (loadingTime) {
        return (
            <div className={`splash splash-${loadingData > 0 ? 1 : 0}`}>
                <TitleSVG />
                <div className="invisible mt-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    } else if (loadingData === 0) {
        setTimeout(() => {
            window.location.reload();
        }, 10000);

        return (
            <div className={`splash`}>
                <TitleSVG />
                <div className="fade-in mt-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    } else if (status) {
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
