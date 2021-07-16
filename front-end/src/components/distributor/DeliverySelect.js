import React from "react";
import Select from "react-select";

export default function DeliverySelect({ setDelivery }) {
    return (
        <Select
            options={[
                {
                    value: 3,
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
        paddingLeft: "0.74rem",
        paddingRight: "0.74rem",
        marginTop: "12px",
        height: "38px",
        boxShadow: "none",
    }),
    indicatorsContainer: () => ({}),
};
