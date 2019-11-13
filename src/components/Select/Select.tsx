import * as React from "react";
import { Select as SelectAnt } from "antd";
import { formInputOnChange } from "@/helpers/formInputOnChange";
import { SelectProps } from "antd/lib/select";

interface IInputNumber extends SelectProps {
  name?: string;

  onChange?(name?: any, value?: any): void;
}

export const Select = (props: IInputNumber) => (
  <SelectAnt
    {...props}
    onChange={value => {
      if (props.onChange && props.name) {
        props.onChange(formInputOnChange(props.name, value ));
      }
    }}
  />
);