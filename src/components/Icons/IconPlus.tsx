import * as React from "react";

interface IIconAvatar {
    initials?: string;
}

const style = {
    fontSize: "1.5em",
    fontStyle: "normal",
    lineHeight: 0,
    justifyContent: "center",
};

export const IconPlus = (props: IIconAvatar) => (
    <i className="icon-plus" style={style}>
        +
    </i>
);
