import * as React from "react";
import {IconAvatar} from "../Icons/IconAvatar";

interface IAvatar {
  name: string;
  onClick?(args: any): void;
}


export const Avatar = (props: IAvatar) => {
  const initials = props.name.split(/\s+/).map(word => word[0]).join("").substr(0, 1);
  return(
    <IconAvatar onClick={props.onClick} initials={initials}/>
  );
};
