import * as React from "react";
// import {IReactChildren} from "types/ReactChildren";

interface IRowProps extends IReactChildren {
    noGutters?: boolean;
    className?: string;
    style?: any;
}

export const Row = (props: IRowProps) => {
    let classNames = "row ";
    if (props.noGutters) {
        classNames += "no-gutters ";
    }
    return (<div className={`${classNames} ${props.className}`} style={props.style}>{props.children}</div>);
};
