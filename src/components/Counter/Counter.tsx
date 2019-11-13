import * as React from "react";
import "./counter.scss";

interface ICounterProps {
    label: string;
    value: string | number;
}

export const Counter = (props: ICounterProps) => (
    <div className="counter__wrapper">
        <h4 className="counter__label">{props.label}:</h4>
        <span className="counter__value">{props.value}</span>
    </div>
)