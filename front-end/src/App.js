import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import DistributorLogin from "./components/DistributorLogin";
import RetailerLogin from "./components/RetailerLogin";
import DistributorSignup from "./components/DistributorSignup";
import RetailerSignup from "./components/RetailerSignup";
import TitleSVG from "./TitleSVG";
import "./App.css";

function App() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2500);
    }, []);

    return (
        <div className="Container">
            <div className="App user-select-none row">
                <Switch>
                    {loading ? (
                        <div className="splash">
                            <TitleSVG />
                        </div>
                    ) : (
                        <>
                            <Route
                                path="/"
                                exact
                                component={DistributorLogin}
                            />
                            <Route
                                path="/login/distributor"
                                exact
                                component={DistributorLogin}
                            />
                            <Route
                                path="/login/retailer"
                                exact
                                component={RetailerLogin}
                            />
                            <Route
                                path="/signup/distributor"
                                exact
                                component={DistributorSignup}
                            />
                            <Route
                                path="/signup/retailer"
                                exact
                                component={RetailerSignup}
                            />
                        </>
                    )}
                </Switch>
            </div>
        </div>
    );
}

export default App;
