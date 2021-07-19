import React from "react";
import Select from "react-select";
import axios from "axios";

export default function DeliverySelect({ oid }) {
    let count = 0;
    let valueArray = [];

    const setDelivery = (option) => {
        count++;
        valueArray.push(option.value);
        let valueTimeout = 0;

        const timeOut = setTimeout(() => {
            valueTimeout = valueArray.pop();
            console.log(valueTimeout);
            // console.log(count);
            axios
                .post(`/d/o${oid}/delivery`, {
                    value: valueTimeout,
                })
                .then((res) => {
                    console.log(res.data.message);
                })
                .catch((err) => {
                    console.error(err.response);
                });
            count--;
        }, 5000);

        if (count !== 1) {
            clearTimeout(timeOut);
        }

        setTimeout(() => {
            count = 0;
        }, 5010);
    };

    return (
        <Select
            options={[
                {
                    value: 2,
                    label: "Delivered",
                },
                {
                    value: 1,
                    label: "Pending",
                },
                {
                    value: 0,
                    label: "Not Delivered",
                },
            ]}
            styles={customStyles}
            isSearchable={false}
            defaultValue={{
                value: 1,
                label: "Pending",
            }}
            onChange={setDelivery}
        />
    );
}

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        border: "none",
        paddingLeft: "1rem",
        boxShadow: "none",
    }),
    indicatorsContainer: () => ({}),
    Menu: (provided, state) => ({
        ...provided,
    }),
};
