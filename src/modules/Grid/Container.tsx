import * as React from "react";
// import {IReactChildren} from "types/ReactChildren";

export enum containerSizeMode {
    container = "container",
    fluid = "container-fluid",
    post = "container-post",

}

interface IContainerProps extends IReactChildren{
    className?: string;
    sizeMode?: containerSizeMode;
}

export const Container = (props: IContainerProps) => {
    return (<div className={`${props.sizeMode} ${props.className}`}>{props.children}</div>);
};
