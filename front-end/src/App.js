import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import RetailerLogin from "./components/RetailerLogin";
import TitleSVG from './TitleSVG';
import Login from './components/DistributorLogin';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <div className="Container">
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/retailer-login' component={RetailerLogin} />
            {loading ? 
              <TitleSVG /> :
              <Login />
            }
          </Switch>
        </BrowserRouter> 
      </div>
    </div>
  );
}

export default App;
