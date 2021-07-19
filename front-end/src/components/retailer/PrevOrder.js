import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export default function PrevOrder({ distributor, previous, isPlaced, setIsPlaced }) {
    useEffect(() => {
        document.title = "Previous Order Summary – DairyDash";
    }, []);

    return (
        <>
            <h3 className="blue">Previous Order Summary</h3>
            <div></div>
            <h5 className="dark-blue p-1 my-1">
                Your order has been delivered by <br /> {distributor.name}
            </h5>
            <div className="items-container">
                {previous ? (
                    previous.map((product) => {
                        return (
                            <div
                                key={product.pid}
                                className={`items-box bg-white login-form ${product.name} px-2 py-2`}
                            >
                                <h6 className="m-0 text-truncate">{product.name}</h6>
                                <h3>{product.count}</h3>
                                <p>pack{product.count === 1 ? "" : "s"}</p>
                            </div>
                        );
                    })
                ) : (
                    <>Place your first order</>
                )}
            </div>
            <h5 className="text-center dark-blue-faded">
                Haven’t received your order?&nbsp;
                <a href={`tel: ${distributor.phone}`} className="dark-blue">
                    Call distributor
                </a>
            </h5>
            <div className="mt-3 mb-2">
                <Link
                    to="/order"
                    onClick={() => {
                        if (isPlaced === 2) {
                            setIsPlaced(1);
                        }
                    }}
                    className="btn bg-dark-blue py-2 pe-2 ps-3"
                    type="submit"
                >
                    {isPlaced === 0 ? "Place Next Order" : "Show Current Order"}
                    <div className="d-inline-block ps-5">
                        <IoIosArrowForward size="18px" />
                    </div>
                </Link>
            </div>
        </>
    );
}
