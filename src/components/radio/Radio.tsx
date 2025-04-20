"use client";
import React from "react";
import "./Radio.scss";
import { clsx } from "clsx";

type CustomCheckboxProps = {
  classes?: string;
  label?: string;
  onChange?: () => void;
} & React.ComponentProps<"input">;

const Radio = (props: CustomCheckboxProps) => {
  const {
    classes,
    label,
    checked=false,
    onChange = () => {},
    ...rest
  } = props;
  
  return (
    <div
      className={clsx("radio-wrapper cursor-pointer", classes)}
      onClick={onChange}
    >
      <label className="flex gap-4 items-center cursor-pointer">
        <input
          type="radio"
          className={clsx("radio-input")}
          onChange={onChange}
          checked={checked}
          {...rest}
        />
        <span className="font-bold">{label}</span>
      </label>
    </div>
  );
};

export default Radio;
