import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import TitleSVG from './TitleSVG';
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
        {loading ? 
            <TitleSVG /> :
          <>
            <img src={logo} className="App-logo" alt="logo" />
            <p>Edit <code>src/App.js</code> and save to reload.</p>
          </>
        } 
      </div>
    </div>
  );
}

export default App;
