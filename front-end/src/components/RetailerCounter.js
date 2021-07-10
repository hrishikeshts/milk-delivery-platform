export default function RetailerCounter({
    products,
    count,
    setCount,
    price,
    setPrice,
    placeOrder,
}) {
    return (
        <>
            <h3 className='blue'>Place Upcoming Order</h3>
            {products.map((product) => {
                return (
                    <div key={product.pid}>
                        {product.name}
                        <button
                            className='btn button bg-blue'
                            onClick={() => {
                                if (count[product.pid] > 0) {
                                    setCount((prevCount) => {
                                        return {
                                            ...prevCount,
                                            [product.pid]:
                                                prevCount[product.pid] - 1,
                                            total: prevCount.total - 1,
                                        };
                                    });
                                    setPrice((prevPrice) => {
                                        return {
                                            ...prevPrice,
                                            total:
                                                prevPrice.total - product.price,
                                        };
                                    });
                                }
                            }}
                        >
                            -
                        </button>
                        <span>{count[product.pid]}</span>
                        &nbsp;
                        <span>₹{price[product.pid]}</span>
                        <button
                            className='btn button bg-blue'
                            onClick={() => {
                                setCount((prevCount) => {
                                    return {
                                        ...prevCount,
                                        [product.pid]:
                                            prevCount[product.pid] + 1,
                                        total: prevCount.total + 1,
                                    };
                                });
                                setPrice((prevPrice) => {
                                    return {
                                        ...prevPrice,
                                        total: prevPrice.total + product.price,
                                    };
                                });
                            }}
                        >
                            +
                        </button>
                    </div>
                );
            })}
            <div>{count.total}</div>
            <div>₹{price.total}</div>
            <div className='mt-3 mb-2'>
                <button
                    className='btn button bg-blue px-3'
                    onClick={placeOrder}
                >
                    Confirm
                </button>
            </div>
        </>
    );
}
