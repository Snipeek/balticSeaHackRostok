import * as React from "react";
import {ReactChild} from "react";

import "./tabs-menu-item.scss";
import classNames from "classnames";

interface ITabsMenuItemProps {
    children: ReactChild | ReactChild[]
    current?: boolean;
    onClick?(args: any): any;
}

export const TabsMenuItem = (props: ITabsMenuItemProps) => {
    return(
        <div className={classNames("tabs-menu-item", { "tabs-menu-item_current" : props.current })} onClick={props.onClick}>
            {props.children}
        </div>
    )
}