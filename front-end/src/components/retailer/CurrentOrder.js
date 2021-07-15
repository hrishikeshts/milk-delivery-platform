import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export default function CurrentOrder({ order, products, count, isPlaced, setIsPlaced }) {
    useEffect(() => {
        document.title = "Current Order Summary – DairyDash";
    }, []);

    return (
        <>
            <h3 className='blue'>Current Order Summary</h3>
            {order && isPlaced !== 3
                ? order.map((product) => {
                      return (
                          <div key={product.pid}>
                              {product.name}&nbsp;
                              {product.count}
                          </div>
                      );
                  })
                : products.map((product, key) => {
                      return (
                          <div key={product.pid}>
                              {product.name}&nbsp;
                              {count[key + 1]}
                          </div>
                      );
                  })}
            <div className='mt-3 mb-2'>
                {isPlaced === 1 ? (
                    <button
                        className='btn lg-btn bg-dark-blue py-2 pe-2 ps-3'
                        type='submit'
                        onClick={() => {
                            setIsPlaced(2);
                        }}
                    >
                        Edit Current Order
                        <div className='d-inline-block ps-5'>
                            <IoIosArrowForward size='18px' />
                        </div>
                    </button>
                ) : (
                    <>
                        Your order has already been updated!
                        <Link to='/' className='btn bg-dark-blue py-2 pe-2 ps-3' type='submit'>
                            Show Previous Order
                            <div className='d-inline-block ps-5'>
                                <IoIosArrowForward size='18px' />
                            </div>
                        </Link>
                    </>
                )}
            </div>
        </>
    );
}
