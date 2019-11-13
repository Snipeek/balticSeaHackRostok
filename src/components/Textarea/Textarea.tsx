import * as React from "react";
import "./textarea.scss";
import {InputWrapper} from "@/components/Input/InputWrapper";

export interface ITextareaProps {
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
}

export const Textarea = (props: ITextareaProps) => {

    const errorClass = props.error ? "input__wrapper_error" : "";
    const inputClassName = (props.onlyInput ? props.className + " " + errorClass : "input__field");
    const disabledClass = props.disabled ? "control-disabled" : null;

    return(
        <InputWrapper label={props.label} error={props.error} className={props.className}>
            <textarea
                {...props.extraProps} className={`textarea ${inputClassName} ${disabledClass}`}
                placeholder={props.placeholder}
                disabled={props.disabled}
                value={props.value}
                required={props.required}
                name={props.name}
                key={props.name}
                onChange={props.onChange}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
            />
        </InputWrapper>
    );
}