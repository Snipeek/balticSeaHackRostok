import * as React from "react";
import "./input.scss";
import {FormError} from "@/components/Error/FromError";

interface IInputWrapperProps {
    label?: string;
    error?: string;
    className?: string;
    children?: any;
}

export const InputWrapper = (props: IInputWrapperProps) => {
    const errorClass = typeof props.error === "string" ? "input__wrapper_error" : "";
    return (  <div className={`input__wrapper ${errorClass} ${props.className}`}>
        <label className="input__lbl">
            {props.label ? (<span className="input__label">{props.label}</span>) : null}
            {props.children}
            <FormError error={props.error}/>
        </label>
    </div>);
};
