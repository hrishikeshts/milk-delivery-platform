import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

export default function Region({ loading, setRegion }) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        axios
            .get("region")
            .then((res) => {
                console.log(res.data);
                const options = res.data.map((data) => ({
                    value: data.name,
                    label: data.name,
                }));
                setOptions(options);
            })
            .catch((err) => {
                console.error(err.response);
            });
    }, []);

    return (
        <Select
            options={options}
            onChange={setRegion}
            placeholder='Region'
            styles={customStyles}
            isSearchable={false}
        />
    );
}

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        transition: state.isFocused ? "0.4s" : "0.4s",
        border: state.isFocused
            ? "2px solid #0078f0 !important"
            : "2px solid #c1e0ff",
        paddingLeft: "0.74rem",
        paddingRight: "0.74rem",
        marginTop: "12px",
        height: "38px",
        "&:hover": {
            border: "2px solid #7bbdff",
        },
        boxShadow: "none",
    }),
    placeholder: (provided, state) => ({
        position: "absolute",
        fontWeight: "400",
        color: "#0078f0",
        top: state.isFocused ? "-11px" : "6px",
        left: state.isFocused ? "8px" : "0.74rem",
        fontSize: state.isFocused ? "13.5px" : "15px",
        backgroundColor: state.isFocused ? "white" : "",
        transition: state.isFocused ? "0.4s" : "0.4s",
        padding: state.isFocused ? "0 4px" : "",
    }),
    dropdownIndicator: (provided, state) => ({
        color: state.isFocused ? "#0078f0 !important" : "#c1e0ff",
        "&:hover": {
            color: "#7bbdff",
        },
    }),
    menu: (provided) => ({
        ...provided,
        boxShadow: "0px 2px 10px rgba(0, 55, 111, 0.3)",
    }),
    singleValue: (provided) => ({
        ...provided,
        height: "46px",
        position: "absolute",
        top: "14px",
        left: "7px",
        textAlign: "left",
        padding: "0 3.5px",
        lineHeight: "1.3",
        "&::before": {
            padding: "0 4px",
            content: "'Region'",
            display: "block",
            color: "#0078f0",
            fontSize: "13.5px",
            backgroundColor: "white",
            width: "min-content",
            transform: "translateX(-4px)",
        },
        backgroundColor: "transparent !important",
    }),
    input: () => ({}),
    valueContainer: () => ({}),
    indicatorsContainer: () => ({}),
};
