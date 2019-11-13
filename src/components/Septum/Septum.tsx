import * as React from "react";

import "./septum.scss";

export enum positionSeptum {
    vertical = "septum_vertical",
    horisontal = "septum_horisontal",
}

interface ISeptumProps {
    position?: positionSeptum,
}

export const Septum = (props: ISeptumProps) => (
    <hr className={`septum ${props.position || positionSeptum.horisontal}`} />
);