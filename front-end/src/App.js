import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import DistributorSignup from "./components/auth/DistributorSignup";
import RetailerSignup from "./components/auth/RetailerSignup";
import DistributorLogin from "./components/auth/DistributorLogin";
import RetailerLogin from "./components/auth/RetailerLogin";
import DistributorPage from "./components/distributor/DistributorPage";
import RetailerPage from "./components/retailer/RetailerPage";
import TitleSVG from "./TitleSVG";
import axios from "axios";
import "./App.scss";

axios.defaults.baseURL = "http://localhost:4000";

export default function App() {
    const [loading, setLoading] = useState(true);

    const [status, setStatus] = useState(false);
    const [role, setRole] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);

        axios
            .get("/status", {
                headers: {
                    "access-token": localStorage.getItem("token"),
                },
            })
            .then((res) => {
                // console.log(res.data);
                if (res.data.auth) {
                    setStatus(true);
                    setData(res.data.user);
                    if (res.data.user.did) {
                        setRole(true);
                    } else if (res.data.user.rid) {
                        setRole(false);
                    }
                }
            })
            .catch((err) => {
                console.error(err.response);
                setStatus(false);
            });
    }, []);

    const props = { status, role, data, setStatus, setRole, setData };

    return (
        <div className='Container'>
            <div className='App user-select-none row'>
                <Switch>
                    {loading ? (
                        <Route>
                            <div className='splash'>
                                <TitleSVG />
                            </div>
                        </Route>
                    ) : status ? (
                        role ? (
                            // Route for logged in distributor
                            <Route path='/'>
                                <DistributorPage {...props} />
                            </Route>
                        ) : (
                            // Route for logged in retailer
                            <Route path='/'>
                                <RetailerPage {...props} />
                            </Route>
                        )
                    ) : (
                        // Route for logged out distributors and retailers
                        <Switch>
                            <Route path='/' exact>
                                <DistributorSignup {...props} />
                            </Route>
                            <Route path='/signup/distributor' exact>
                                <DistributorSignup {...props} />
                            </Route>
                            <Route path='/signup/retailer' exact>
                                <RetailerSignup {...props} />
                            </Route>
                            <Route path='/login/distributor' exact>
                                <DistributorLogin {...props} />
                            </Route>
                            <Route path='/login/retailer' exact>
                                <RetailerLogin {...props} />
                            </Route>
                        </Switch>
                    )}
                </Switch>
            </div>
        </div>
    );
}
