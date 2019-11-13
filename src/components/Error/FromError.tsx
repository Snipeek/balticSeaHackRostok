import * as React from "react";
import "./form_error.scss";

interface IFormErrorProps {
    error?: string;
}

export const FormError = (props: IFormErrorProps) => {
    if (!props.error) {
        return null;
    }
    return (
        <div className="input-wrapper">
            <div className="form_error">{props.error}</div>
        </div>
    );
};
