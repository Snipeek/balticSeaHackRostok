import * as React from "react";
import "./input.scss";
import {InputWrapper} from "@/components/Input/InputWrapper";
import { Input as InputAnt } from 'antd';
import {InputProps} from "antd/es/input";

export interface IInputProps extends InputProps {
    onlyInput?: boolean;
    label?: string;
    error?: string;
    className?: string;
    children?: string;
    component?: string;
}

export const Input = (props: IInputProps) => {
    const defaultProps: InputProps = {
        size: "large"
    }

    // @ts-ignore
    const InputComponent = props.component ? InputAnt[props.component] : InputAnt;
    const input = (
        <InputComponent
            {...defaultProps}
            {...props}
        />);
    if (props.onlyInput) {
        return input;
    }
    return (
        <InputWrapper label={props.label} error={props.error} className={props.className}>
            {input}
            {props.children}
        </InputWrapper>
    );
};
