import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import PrevOrder from "./PrevOrder";
import PlaceOrder from "./PlaceOrder";
import CurrentOrder from "./CurrentOrder";
import TitleSVG from "../../TitleSVG";

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
                setPrevious(res.data.result);
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
            <>
                <div className='title-head fade-in'>
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
                    {previous ? (
                        <Switch>
                            <Route path='/' exact>
                                <PrevOrder {...props} />
                            </Route>
                            <Route path={["/signup/retailer", "/login/retailer"]}>
                                <Redirect to='/' />
                            </Route>
                        </Switch>
                    ) : (
                        <Redirect to='/order' />
                    )}

                    {isPlaced === 0 || isPlaced === 2 ? (
                        <Switch>
                            <Route path='/order' exact>
                                <PlaceOrder {...props} />
                            </Route>
                            <Route path={["/signup/retailer", "/login/retailer"]}>
                                <Redirect to='/order' />
                            </Route>
                        </Switch>
                    ) : isPlaced === 1 || isPlaced === 3 ? (
                        <Switch>
                            <Route path='/order' exact>
                                <CurrentOrder {...props} />
                            </Route>
                            <Route path={["/signup/retailer", "/login/retailer"]}>
                                <Redirect to='/order' />
                            </Route>
                        </Switch>
                    ) : (
                        <></>
                    )}
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
