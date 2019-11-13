import * as React from "react";
import "./input-clear.scss";
import classNames from "classnames";

export interface IInputClear {
    name?: string;
    label?: string;
    placeholder?: string;
    value?: string | number;
    error?: string;
    type?: string;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    className?: string;
    required?: boolean;
    children?: any;
    onlyInput?: boolean;
    autoComplete?: string;
    autoCorrect?: string;
    extraProps?: {
        itemProp?: string;
    };

    onBlur?(e: any): any;

    onChange?(e: any): any;

    onFocus?(e: any): any;

    onKeyPress?(e: any): any;
}

export const InputClear = (props: IInputClear) => {
    return(
        <div className="input-clear__wrapper">
            <input className={classNames("input-clear__input", props.className, { ["input-clear__input_error"]: props.error })}
                   placeholder={props.placeholder}
                   value={props.value}
                   onChange={props.onChange}
                   onFocus={props.onFocus}
                   onBlur={props.onBlur}
                   onKeyPress={props.onKeyPress}

                   title={props.error || ""}
            />
        </div>
    );
}