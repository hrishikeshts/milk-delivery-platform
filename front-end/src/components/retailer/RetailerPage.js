import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import PrevOrder from "./PrevOrder";
import PlaceOrder from "./PlaceOrder";
import CurrentOrder from "./CurrentOrder";
import "../../styles/retailer.scss";
import Hamburger from "../../assets/hamburger.svg";

export default function RetailerPage({ status, data }) {
    const [products, setProducts] = useState([]);
    const [distributor, setDistributor] = useState([]);
    const [previous, setPrevious] = useState([]);
    const [count, setCount] = useState({ total: 0 });
    const [price, setPrice] = useState({ total: 0 });
    const [isPlaced, setIsPlaced] = useState(false);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        axios
            .get(`/${data.rid}/products`)
            .then((res) => {
                // console.log(res.data);
                setProducts(res.data);
            })
            .catch((err) => {
                console.error(err.response);
            });

        axios
            .get(`/r${data.rid}/status`)
            .then((res) => {
                console.log(res.data.message);
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
                setDistributor(res.data[0]);
            })
            .catch((err) => {
                console.error(err.response);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
    };

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
                    {previous ? (
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
                    )}
                </div>
            </div>
        );
    } else {
        return <Redirect to="/" />;
    }
}
