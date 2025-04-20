"use client";
import React, { useState } from "react";
import "./Checkbox.scss";
import { clsx } from "clsx";

type CustomCheckboxProps = {
  classes?: string;
  label?: string;
  onCheckboxClick?: (checked: boolean) => void;
} & React.ComponentProps<"input">;

const Checkbox = (props: CustomCheckboxProps) => {
  const {
    classes,
    label,
    checked,
    onCheckboxClick = () => {},
    ...rest
  } = props;
  const defaultState = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultState);

  const onClick = (e) => {
    e?.stopPropagation();
    setIsChecked((prev) => {
      onCheckboxClick(!prev);
      return !prev;
    });
  };

  return (
    <div
      className={clsx("checkbox-wrapper cursor-pointer", classes)}
      onClick={onClick}
    >
      <label className="flex gap-4 items-center cursor-pointer">
        <input
          type="checkbox"
          className={clsx("checkbox-input", { checked: isChecked })}
          checked={isChecked}
          onChange={onClick}
          {...rest}
        />
        <span className="font-bold">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
