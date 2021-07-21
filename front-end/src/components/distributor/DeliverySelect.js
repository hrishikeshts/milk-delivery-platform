import React, { createElement } from "react";
import Select from "react-select";
import axios from "axios";
import { FiCheckCircle, FiXCircle, FiAlertCircle } from "react-icons/fi";
import { renderToStaticMarkup } from "react-dom/server";

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
            valueArray = [];
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

const reactSvgComponentToMarkupString = (Component, props) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(createElement(Component, props)))}`;

const optionStyle = (provided, state) => {
    // console.log(state);
    return {
        ...provided,
        fontWeight: "500",
        fontSize: "0.9rem",
        cursor: "pointer",
        transition: "0.15s",
        color:
            state.data.value === 2
                ? "#15bd15"
                : state.data.value === 0
                ? "red"
                : state.data.value === 1
                ? "#859BB0"
                : "black",
        ":before": {
            content:
                state.data.value === 2
                    ? `url(${reactSvgComponentToMarkupString(FiCheckCircle, { color: "#15bd15" })})`
                    : state.data.value === 0
                    ? `url(${reactSvgComponentToMarkupString(FiXCircle, { color: "red" })})`
                    : state.data.value === 1
                    ? `url(${reactSvgComponentToMarkupString(FiAlertCircle, { color: "#859BB0" })})`
                    : ``,
            verticalAlign: "-12%",
            paddingRight: "0.3rem",
        },
        ":hover": {
            transition: "0.15s",
            color:
                state.data.value === 2
                    ? "#138513"
                    : state.data.value === 0
                    ? "#b00000"
                    : state.data.value === 1
                    ? "#566471"
                    : "black",
            ":before": {
                content:
                    state.data.value === 2
                        ? `url(${reactSvgComponentToMarkupString(FiCheckCircle, { color: "#138513" })})`
                        : state.data.value === 0
                        ? `url(${reactSvgComponentToMarkupString(FiXCircle, { color: "#b00000" })})`
                        : state.data.value === 1
                        ? `url(${reactSvgComponentToMarkupString(FiAlertCircle, { color: "#566471" })})`
                        : ``,
            },
        },
    };
};

const customStyles = {
    control: (provided) => ({
        ...provided,
        border: "none",
        boxShadow: "none",
        width: "9.1rem",
    }),
    indicatorsContainer: () => ({ display: "none" }),
    dropdownIndicator: () => ({}),
    menu: (provided) => ({
        ...provided,
        boxShadow: "0px 8px 20px rgba(0, 55, 111, 0.1)",
        border: "1px solid #c1e0ff",
        borderRadius: "15px",
        marginRight: "0",
        width: "10rem",
    }),
    option: (provided, state) => {
        return {
            ...optionStyle(provided, state),
            background: "transparent",
            borderRadius: "15px",
            ":active": {
                background: "transparent",
            },
        };
    },
    singleValue: (provided, state) => {
        return {
            ...optionStyle(provided, state),
            margin: "0",
        };
    },
    valueContainer: (provided, state) => ({
        ...provided,
        justifyContent: "flex-end",
        padding: "0",
    }),
};
