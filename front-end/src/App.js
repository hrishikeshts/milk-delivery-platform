import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DistributorSignup from "./components/DistributorSignup";
import RetailerSignup from "./components/RetailerSignup";
import DistributorLogin from "./components/DistributorLogin";
import RetailerLogin from "./components/RetailerLogin";
import Home from "./components/Home";
import TitleSVG from "./TitleSVG";
import axios from "axios";
import "./App.css";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
    const [loading, setLoading] = useState(true);

    const [status, setStatus] = useState(false);
    const [role, setRole] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);

        axios
            .get("status", {
                headers: {
                    "access-token": localStorage.getItem("token"),
                },
            })
            .then((res) => {
                console.log(res);
                if (res.data.auth) {
                    setStatus(true);
                    setData(res.data.user);
                    setRole(res.data.user.role);
                }
            })
            .catch((err) => {
                console.log(err);
                setStatus(false);
            });
    }, []);

    return (
        <div className="Container">
            <div className="App user-select-none row">
                <Switch>
                    {loading ? (
                        <>
                            <div className="splash">
                                <TitleSVG />
                            </div>
                        </>
                    ) : (
                        <>
                            {status ? (
                                <Route path="/" exact>
                                    <Home status={status} data={data} />
                                </Route>
                            ) : (
                                <>
                                    <Route path="/" exact>
                                        <DistributorSignup status={status} setStatus={setStatus} setData={setData} />
                                    </Route>
                                </>
                            )}
                            <Route path="/login/distributor" exact>
                                <DistributorLogin />
                            </Route>
                            <Route path="/login/retailer" exact>
                                <RetailerLogin />
                            </Route>
                            <Route path="/signup/distributor" exact>
                                <DistributorSignup status={status} setStatus={setStatus} setData={setData} />
                            </Route>
                            <Route path="/signup/retailer" exact>
                                <RetailerSignup status={status} setStatus={setStatus} setData={setData} />
                            </Route>
                        </>
                    )}
                </Switch>
            </div>
        </div>
    );
}

export default App;
