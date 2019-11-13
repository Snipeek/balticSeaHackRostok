import * as React from "react";
import {IconWallet} from "@/components/Icons/IconWallet";
import "./billing.scss";

interface IBillingProps {
    count?: number;
}

export const Billing = (props: IBillingProps) => {
    return(
        <div className="billing__wrapper">
            <IconWallet />
            <span className="billing__value">
                {props.count || 0}
                <span className="billing__currency">
                    $
                </span>
            </span>
        </div>
    );
}