import * as React from "react";

import "./button.scss";
import {Link} from "react-router-dom";

export enum mode {
    link = "link",
    btn = "btn",
}

export enum shapeMode {
    default = "btn_default",
    round = "btn_round",
}
export enum size {
    full = "btn_full",
    big = "btn_big",
    small = "btn_small",
}
export enum color {
    primary = "btn_primary",
    secondary = "btn_secondary",
    danger = "btn_danger",
    tertiary = "btn_tertiary",
    add_task = "task_add",
    add_project = "project-card_add",
}

interface IButton {
    disabled?: boolean;
    to?: string;
    mode?: mode;
    shapeMode?: shapeMode;
    size?: size;
    color?: color;
    className?: string;
    children?: React.ReactChild | any;
    type?: any;
    noPadding?: boolean;
    title?: string;

    onChange?(e?: any): any;
    onClick?(e?: any): any;
}

export const Button = (props: IButton) => {
    const Tag: any = props.to ? Link : "button";
    const modeClass = props.mode ? props.mode : mode.btn;
    const shapeModeClass = props.shapeMode ? props.shapeMode : shapeMode.default;
    const sizeClass = props.size ? props.size : "";
    const className = props.className ? props.className : "";
    const noPadding = props.noPadding ? `${props.mode}_nopadding` : "";
    const disabledClass = props.disabled ? `${props.mode || mode.btn}_disabled` : "";
    const btnColor = props.color || color.secondary;
    const btnType = props.type || "";
    return (
        <Tag to={props.to} title={props.title} className={`${modeClass} ${shapeModeClass} ${sizeClass} ${className} ${disabledClass} ${noPadding} ${modeClass === mode.btn ? btnColor : null}`} onClick={props.onClick} type={btnType} disabled={props.disabled}>{props.children}</Tag>
    );
}

