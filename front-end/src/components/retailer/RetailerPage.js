import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import PrevOrder from "./PrevOrder";
import PlaceOrder from "./PlaceOrder";
import CurrentOrder from "./CurrentOrder";
import "../../styles/retailer.scss";
import Hamburger from "../../assets/hamburger.svg";
import TitleSVG from "../../TitleSVG";

export default function RetailerPage({ loadingTime, loadingData, setLoadingData, status, data, socket, hour }) {
    const [products, setProducts] = useState([]);
    const [distributor, setDistributor] = useState([]);
    const [previous, setPrevious] = useState([]);
    const [count, setCount] = useState({ total: 0 });
    const [price, setPrice] = useState({ total: 0 });
    const [isPlaced, setIsPlaced] = useState(0);
    const [order, setOrder] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            socket.on("delivery", (message) => {
                console.log(message);
                setTimeout(() => {
                    setUpdate(!update);
                });
            });
        }

        return function cleanup() {
            mounted = false;
        };
    });

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            axios
                .get(`/${data.rid}/products`)
                .then((res) => {
                    // console.log(res.data);
                    setLoadingData(loadingData++);
                    setProducts(res.data);
                })
                .catch((err) => {
                    console.error(err.response);
                });

            axios
                .get(`/r${data.rid}/status`)
                .then((res) => {
                    // console.log(res.data.message);
                    setLoadingData(loadingData++);
                    setIsPlaced(res.data.isPlaced);
                    setOrder(res.data.result);
                })
                .catch((err) => {
                    console.error(err.response);
                });

            // setInterval(() => {
            axios
                .get(`/r${data.rid}/previous`)
                .then((res) => {
                    // console.log(res.data.result);
                    setLoadingData(loadingData++);
                    setPrevious(res.data);
                })
                .catch((err) => {
                    console.error(err.response);
                });
            // }, 5000);

            axios
                .get(`/r${data.rid}/distributor`)
                .then((res) => {
                    // console.log(res.data[0]);
                    setLoadingData(loadingData++);
                    setDistributor(res.data[0]);
                })
                .catch((err) => {
                    console.error(err.response);
                });
        }

        return function cleanup() {
            mounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [update]);

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

    const props = {
        data,
        products,
        distributor,
        previous,
        count,
        setCount,
        price,
        setPrice,
        order,
        isPlaced,
        setIsPlaced,
        socket,
        hour,
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
                                    href={`tel:${distributor.phone}`}
                                    className="w-100 text-center text-decoration-none my-1"
                                >
                                    Call Distributor
                                </a>
                                <a
                                    href="/login/retailer"
                                    onClick={() => {
                                        localStorage.clear();
                                    }}
                                    className="w-100 text-center text-decoration-none my-1"
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
                            <PrevOrder {...props} />
                        </Route>
                        <Route path="/order" exact>
                            {isPlaced === 0 || isPlaced === 2 ? (
                                hour < 19 && hour >= 7 ? (
                                    <PlaceOrder {...props} />
                                ) : (
                                    <Redirect to="/" />
                                )
                            ) : isPlaced === 1 || isPlaced === 3 ? (
                                <CurrentOrder {...props} />
                            ) : (
                                <Redirect to="/" />
                            )}
                        </Route>
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                    {/* {previous ? (
                        <Switch>
                            <Route path="/" exact>
                                <PrevOrder {...props} />
                            </Route>
                            <Route path={["/signup/retailer", "/login/retailer"]}>
                                <Redirect to="/" />
                            </Route>
                        </Switch>
                    ) : (
                        <Redirect to="/order" />
                    )}

                    {isPlaced === 0 || isPlaced === 2 ? (
                        <Switch>
                            <Route path="/order" exact>
                                <PlaceOrder {...props} />
                            </Route>
                            <Route path={["/signup/retailer", "/login/retailer"]}>
                                <Redirect to="/order" />
                            </Route>
                        </Switch>
                    ) : isPlaced === 1 || isPlaced === 3 ? (
                        <Switch>
                            <Route path="/order" exact>
                                <CurrentOrder {...props} />
                            </Route>
                            <Route path={["/signup/retailer", "/login/retailer"]}>
                                <Redirect to="/order" />
                            </Route>
                        </Switch>
                    ) : (
                        <></>
                    )} */}
                </div>
            </div>
        );
    } else {
        return <Redirect to="/" />;
    }
}
