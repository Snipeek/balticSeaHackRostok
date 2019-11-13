import * as React from "react";
import {Link as RouterLink, LinkProps} from "react-router-dom";

import "./link.scss";

export const Link = (props: LinkProps) => {

    return (
        <RouterLink className="link" {...props}>
            {props.children}
        </RouterLink>
    );

};
