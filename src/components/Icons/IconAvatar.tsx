import * as React from "react";

interface IIconAvatar {
  initials?: string;
  onClick?(args: any): void;
}

const style = {
  alignItems: "center",
  color: "#fff",
  fontWeight: "bold",
  backgroundColor: "#333",
  borderRadius: "2rem",
  display: "flex",
  fontSize: "1em",
  fontStyle: "normal",
  height: "1.9rem",
  justifyContent: "center",
  width: "1.9rem",
};

export const IconAvatar = (props: IIconAvatar) => (
    <i className="icon-avatar" style={style} onClick={props.onClick}>
      <span>{props.initials || "@"}</span>
    </i>
);
