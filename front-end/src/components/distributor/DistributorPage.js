import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import TitleSVG from "../../TitleSVG";
import "../../styles/home.scss";
import { IoIosArrowForward } from "react-icons/io";

export default function DistributorPage({ status, data }) {
  const [products, setProducts] = useState([]);
  const [retailerCount, setRetailerCount] = useState({});
  const [orders, setOrders] = useState({});
  const [count, setCount] = useState({ total: 0 });

  useEffect(() => {
    document.title = "Next Delivery Info – DairyDash";

    axios
      .get(`/${data.did}/products`)
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err.response);
      });

    axios
      .get(`/d${data.did}/status`)
      .then((res) => {
        // console.log(res.data);
        setRetailerCount((prevCount) => {
          return {
            ...prevCount,
            total: res.data.retailers.length,
          };
        });
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.error(err.response);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log(products);
    products.map((product) => {
      setCount((prevCount) => {
        return {
          ...prevCount,
          [product.pid]: 0,
        };
      });
      return setRetailerCount((prevCount) => {
        return {
          ...prevCount,
          [product.pid]: 0,
        };
      });
    });
  }, [products]);

  useEffect(() => {
    if (orders.length > 0) {
      var totalCount = orders.reduce((prev, cur) => prev + cur.count, 0);
      setCount((prevCount) => {
        return { ...prevCount, total: totalCount };
      });

      orders.map((order) => {
        setCount((prevCount) => {
          return { ...prevCount, [order.pid]: prevCount[order.pid] + order.count };
        });
        return setRetailerCount((prevCount) => {
          return { ...prevCount, [order.pid]: prevCount[order.pid] + 1 };
        });
      });
    }
  }, [orders]);

  // useEffect(() => {
  //     console.log(retailerCount);
  // }, [retailerCount]);

  if (status) {
    return (
      <>
        <div className="title-head fade-in">
          <div className="user-title">
            <h3 className="dark-blue Comfortaa">{data.name}</h3>
            <h6 className="dark-blue-faded">{data.region}</h6>
          </div>
          <div>
            <a
              href="/"
              onClick={() => {
                localStorage.clear();
              }}
            >
              Log out
            </a>
          </div>
        </div>
        <div className="light-bg center-container py-4 px-3 fade-in">
          <h3 className="blue">Next Delivery Info</h3>
          <div className="chart-box bg-white login-form">
            <div>Total Retailers: {retailerCount.total}</div>
            <div>Retailers ordered: {orders.length / products.length}</div>
            <div>Total Count: {count.total}</div>
          </div>
          <div className="items-container">
            <div className="items-box bg-white login-form px-3 py-2 orange">
              <h6 className="m-0">{"Milk"}</h6>
              <h3>{count[1]}</h3>
              <p>packs for</p>
              <p>
                <text>{retailerCount[1]}</text> retailers
              </p>
            </div>

            <div className="items-box bg-white login-form px-3 py-2 blue">
              <h6 className="m-0">{"Curd"}</h6>
              <h3>{count[2]}</h3>
              <p>packs for</p>
              <p>
                <text>{retailerCount[2]}</text> retailers
              </p>
            </div>

            <div className="items-box bg-white login-form px-3 py-2 green">
              <h6 className="m-0">{"Special Curd"}</h6>
              <h3>{count[3]}</h3>
              <p>packs for</p>
              <p>
                <text>{retailerCount[3]}</text> retailers
              </p>
            </div>
          </div>

          <div className="mt-3 mb-2">
            <button className="btn button bg-blue px-3" type="submit">
              Share as Report
            </button>
          </div>

          <div className="mt-3 mb-2">
            <button className="btn bg-dark-blue py-2 pe-2 ps-3" type="submit">
              Start Delivering
              <div className="d-inline-block ps-5">
                <IoIosArrowForward size="18px" />
              </div>
            </button>
          </div>
        </div>
        <div className="footer-title mb-3 pb-2 mx-auto fade-in">
          <TitleSVG />
        </div>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
}
