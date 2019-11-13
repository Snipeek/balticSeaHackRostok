import * as React from "react";
// import {IReactChildren} from "types/ReactChildren";

interface IColumnMediaParams {
    span?: number;
    order?: number;
    offset?: number;
}

export interface IColumnProps extends IReactChildren {
    className?: string;
    span?: number;
    order?: number;
    offset?: number;
    xs?: number | IColumnMediaParams;
    sm?: number | IColumnMediaParams;
    md?: number | IColumnMediaParams;
    lg?: number | IColumnMediaParams;
    hd?: number | IColumnMediaParams;
}

const classNameGenerator = (sizeBreakpoint: string, columnMedia: IColumnMediaParams): string => {
    let classes = "";
    const sizeBreakpointSuffix = sizeBreakpoint ? "-" + sizeBreakpoint : "";
    if (columnMedia.span !== undefined) {
        classes += ` col${sizeBreakpointSuffix}-${columnMedia.span} `;
    }
    if (columnMedia.offset !== undefined) {
        classes += ` offset${sizeBreakpointSuffix}-${columnMedia.offset} `;
    }
    if (columnMedia.order !== undefined) {
        classes += ` order${sizeBreakpointSuffix}-${columnMedia.order} `;
    }
    return classes;
};

export const Column = (props: IColumnProps) => {
    let classes = "";
    if (props.xs) {
        const columnMedia = Number.isInteger(props.xs as number) ? {span: props.xs as number} : props.xs as IColumnMediaParams;
        classes += classNameGenerator("xs", columnMedia);
    }
    if (props.sm) {
        const columnMedia = Number.isInteger(props.sm as number) ? {span: props.sm as number} : props.sm as IColumnMediaParams;
        classes += classNameGenerator("sm", columnMedia);
    }
    if (props.md) {
        const columnMedia = Number.isInteger(props.md as number) ? {span: props.md as number} : props.md as IColumnMediaParams;
        classes += classNameGenerator("md", columnMedia);
    }
    if (props.lg) {
        const columnMedia = Number.isInteger(props.lg as number) ? {span: props.lg as number} : props.lg as IColumnMediaParams;
        classes += classNameGenerator("lg", columnMedia);
    }
    if (props.hd) {
        const columnMedia = Number.isInteger(props.hd as number) ? {span: props.hd as number} : props.hd as IColumnMediaParams;
        classes += classNameGenerator("hd", columnMedia);
    }
    if (classes.indexOf("col") === -1) {
        classes = classNameGenerator("", {offset: props.offset, order: props.order, span: props.span});
    }
    if (classes.indexOf("col") === -1) {
        classes += " col ";
    }
    classes += " " +  props.className;

    return (<div className={classes}>{props.children}</div>);
};
