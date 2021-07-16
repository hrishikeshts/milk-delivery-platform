import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Status({ products, retailerCount, orders, orderCount }) {

    const percentage = 66;
    return (
        <>
            <h3 className="blue">Next Delivery Info</h3>
            {/* <div className="chart-box bg-white login-form">
                <div>Total Retailers: {retailerCount.total}</div>
                <div>Retailers confirmed: {orders.length / products.length}</div>
                <div>Retailers ordered: {retailerCount.ordered}</div>
                <div>Total Count: {orderCount.total}</div>
            </div> */}
            <div style={{marginLeft: 100,width: 200, height: 200}}>
    
                <CircularProgressbarWithChildren
                    value={66}
                    styles={buildStyles({
                        pathColor: "#0080FF",
                        trailColor: "white",
                        pathTransitionDuration: 0.5,
                    })}
                > 
                    
                    {/* Foreground path */}
                    <CircularProgressbarWithChildren
                        value={44}
                        styles={buildStyles({
                            pathColor:"#003163",
                            trailColor: "transparent",
                            pathTransitionDuration: 0.5,
                        })}
                    >
                    <div>
                        <h2 className="m-0">33</h2>
                        <h6>retailers confirmed</h6>
                        <h2 className="m-0">22</h2>
                        <h6>retailers ordered</h6>
                    </div>
                </CircularProgressbarWithChildren>
                </CircularProgressbarWithChildren>
            </div>
            <div className="items-container">
                {products.map((product, key) => {
                    return (
                        <div key={product.pid} className={`items-box bg-white login-form px-3 py-2 ${product.name}`}>
                            <h6 className="m-0">{product.name}</h6>
                            <h3>{orderCount[key + 1]}</h3>
                            <p>pack{orderCount[key + 1] === 1 ? "" : "s"} for</p>
                            <p>
                                <text>{retailerCount[key + 1]}</text> retailer{retailerCount[key + 1] === 1 ? "" : "s"}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-3 mb-2">
                <button className="btn button bg-blue px-3" type="submit">
                    Share as Report
                </button>
            </div>

            <div className="mt-3 mb-2">
                <Link to="/delivery" className="btn bg-dark-blue py-2 pe-2 ps-3">
                    Start Delivering
                    <div className="d-inline-block ps-5">
                        <IoIosArrowForward size="18px" />
                    </div>
                </Link>
            </div>
        </>
    );
}
