import * as React from "react";
import {CurrentUser} from "@/modules/CurrentUser/CurrentUser";

interface IBaseDataProps {
    children: any;
}

export const BaseData = (props: IBaseDataProps) => {
    return (<CurrentUser>
            {props.children}
    </CurrentUser>);
};
