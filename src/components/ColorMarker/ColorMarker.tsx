import * as React from "react";
import * as classNames from "classnames";

import "./color-marker.scss";

export enum colorMarkerMode {
    red = "red",
    orange = "orange",
    green = "green",
    blue = "blue",
    lightGreen = "lightGreen",
    darkGreen = "darkGreen",
    blueMarker = "blueMarker",
    purpleMarker = "purpleMarker",
    brounMarker = "brounMarker",
    darkBlueMarker = "darkBlueMarker",
    swampMarker = "swampMarker",
    bordoMarker = "bordoMarker",
    yellowMarker = "yellowMarker",
    greyMarker = "greyMarker",
    PinkMarker = "PinkMarker",
    skyblueMarker = "skyblueMarker",
}

interface IColorMarkerProps {
    mode?: colorMarkerMode;
    color?: string;
    className?: string;

    onClick?(e: any): void;
}

export const ColorMarker = (props: IColorMarkerProps) => {
    const styles: React.CSSProperties = {};
    if (props.color) {
        styles.backgroundColor = `${props.color[0] !== "#" ? "#" : ""}${props.color}`;
    }
    return (<div className={classNames(`color-marker`, `color-marker--${props.mode}`, props.className)} style={styles} onClick={props.onClick}/>);
};
