import React from "react";

export default function TitleSVG({ color }) {
    return (
        <svg viewBox="0 0 100 25" xmlns="http://www.w3.org/2000/svg">
            <text
                fill={color ? color : "#0078F0"}
                fontFamily="Comfortaa, cursive"
                fontWeight="700"
                textAnchor="middle"
                fontSize="16.1"
                x="50"
                y="15"
            >
                DairyDash
            </text>
            <text
                fill={color ? color : "#0078F0 "}
                fontFamily="Montserrat, sans-serif"
                fontWeight="500"
                textAnchor="middle"
                fontSize="3.5"
                letterSpacing="1.75"
                x="50"
                y="23"
            >
                MILK DELIVERY PLATFORM
            </text>
        </svg>
    );
}
