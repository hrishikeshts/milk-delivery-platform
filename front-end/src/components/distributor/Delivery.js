import React from "react";
import { Link } from "react-router-dom";
import DeliverySelect from "./DeliverySelect";
import { IoIosArrowForward } from "react-icons/io";

export default function Delivery({ products, retailers, orderDetails, orders, orderCount }) {
    let count = 0;
    const setDelivery = (options) => {
        count++;
        const timeOut = setTimeout(() => {
            console.log(options);
            count--;
        }, 5000);
        if (count !== 1) {
            clearTimeout(timeOut);
        }
    };

    return (
        <>
            <h3 className='blue'>Delivery Status</h3>
            <div className='overflow-auto'>
                {products.map((product, key) => {
                    return (
                        <div key={product.pid} className={`${product.name}`}>
                            <h6 className='m-0'>{product.name}</h6>
                            <h3>{orderCount[key + 1]}</h3>
                        </div>
                    );
                })}
                {orderDetails.map((orderDetail, key) => {
                    return (
                        <div key={orderDetail.oid} className='login-form bg-white px-3 py-2'>
                            <div>{retailers[key].name}</div>
                            <div>{retailers[key].phone}</div>
                            <div>
                                {orders
                                    .filter((filtered) => filtered.oid === orderDetail.oid)
                                    .map((order) => {
                                        return <span key={order.pid}>{order.count} </span>;
                                    })}
                            </div>
                            <div>₹{orderDetail.amount}</div>
                            <DeliverySelect setDelivery={setDelivery} />
                        </div>
                    );
                })}
            </div>

            <div className='mt-3 mb-2'>
                <Link to='/' className='btn bg-dark-blue py-2 pe-2 ps-3'>
                    End Delivering
                    <div className='d-inline-block ps-5'>
                        <IoIosArrowForward size='18px' />
                    </div>
                </Link>
            </div>
        </>
    );
}
