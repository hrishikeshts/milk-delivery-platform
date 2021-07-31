import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DistributorSignup from "./components/auth/DistributorSignup";
import RetailerSignup from "./components/auth/RetailerSignup";
import DistributorLogin from "./components/auth/DistributorLogin";
import RetailerLogin from "./components/auth/RetailerLogin";
import DistributorPage from "./components/distributor/DistributorPage";
import RetailerPage from "./components/retailer/RetailerPage";
import axios from "axios";
import { io } from "socket.io-client";
import "./App.scss";

const serverURL = process.env.SERVER_URL || "http://localhost:4000";
axios.defaults.baseURL = serverURL;
const socket = io(serverURL);
socket.on("connection");

export default function App() {
    const [loadingTime, setLoadingTime] = useState(true);
    const [loadingData, setLoadingData] = useState(0);

    const [status, setStatus] = useState(false);
    const [role, setRole] = useState(true);
    const [data, setData] = useState({});
    const [hour, setHour] = useState(12);

    useEffect(() => {
        setTimeout(() => {
            setLoadingTime(false);
        }, 2000);

        axios
            .get("/status", {
                headers: {
                    "access-token": localStorage.getItem("token"),
                },
            })
            .then((res) => {
                // console.log(res.data);
                console.log(res.data.hour);
                setHour(res.data.hour);
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

    const props = {
        loadingTime,
        loadingData,
        setLoadingData,
        socket,
        hour,
        status,
        role,
        data,
        setHour,
        setStatus,
        setRole,
        setData,
    };

    return (
        <div className="Container">
            <div className="App">
                <Switch>
                    {status ? (
                        role ? (
                            // Route for logged in distributor
                            <Route path="/">
                                <DistributorPage {...props} />
                            </Route>
                        ) : (
                            // Route for logged in retailer
                            <Route path="/">
                                <RetailerPage {...props} />
                            </Route>
                        )
                    ) : (
                        // Route for logged out distributors and retailers
                        <Switch>
                            <Route path="/" exact>
                                <DistributorSignup {...props} />
                            </Route>
                            <Route path="/signup/distributor" exact>
                                <DistributorSignup {...props} />
                            </Route>
                            <Route path="/signup/retailer" exact>
                                <RetailerSignup {...props} />
                            </Route>
                            <Route path="/login/distributor" exact>
                                <DistributorLogin {...props} />
                            </Route>
                            <Route path="/login/retailer" exact>
                                <RetailerLogin {...props} />
                            </Route>
                            <Route path="*">
                                <Redirect to="/" />
                            </Route>
                        </Switch>
                    )}
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}
