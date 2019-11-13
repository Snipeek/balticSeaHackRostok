import * as React from "react";
import {useState} from "react";
import {ReactChild} from "react";

import "./tabs.scss";

export enum tabsSelectType {
    single = "single",
    multy = "multy",
}

interface IChildrenArgs {
    initialState: {
        config: any;
        activeTabs: any;
    };

    changeTab(args: {
        property?: string | number,
        value?: string | number,

        changeStateAfter?(state: any): any;
    }): void;
    isActive(args: any): boolean;
}

interface ITabsProps {
    initialState: {
        config: {
            [name in keyof any]: {
                type: tabsSelectType,
            }
        };
        activeTabs: {
            [name in keyof any]: any[];
        };
    };
    children(args: IChildrenArgs): ReactChild | ReactChild[];
    renderTabs(args: IChildrenArgs): ReactChild | ReactChild[];
}

export const Tabs = (props: ITabsProps) => {

    const initialState = {
        config: {
            ...props.initialState.config,
        },
        activeTabs: {
            ...props.initialState.activeTabs,
        },
    };

    const [state, setState] = useState(initialState);

    const changeTab = ({ property, value, changeStateAfter }) => {

        switch (state.config[property].type) {
            case tabsSelectType.multy:
                setState(prevState => {
                    const indexOf = prevState.activeTabs[property].indexOf(value);
                    if (indexOf !== -1){
                        if (prevState.activeTabs[property].length > 1) {
                            prevState.activeTabs[property].splice(indexOf, 1);
                        }
                    } else {
                        prevState.activeTabs[property].push(value);
                    }

                    if (changeStateAfter) {
                        return { ...changeStateAfter(prevState) };
                    }

                    return { ...prevState };
                });
                break;
            case tabsSelectType.single:
            default:
                setState(prevState => {
                    prevState.activeTabs[property] = [value];

                    if (changeStateAfter) {
                        return changeStateAfter(prevState);
                    }

                    return { ...prevState };
                });
        }

    };

    const isActive = ({ property, value }) => {
        return state.activeTabs[property].indexOf(value) !== -1;
    }

    return(
        <>
            {props.renderTabs({isActive, changeTab, activeTabs: state.activeTabs})}
            {props.children({isActive, changeTab, activeTabs: state.activeTabs})}
        </>
    );
}