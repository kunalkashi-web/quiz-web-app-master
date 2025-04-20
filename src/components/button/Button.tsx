import React from "react";
import "./button.scss";
import { clsx } from "clsx";

type CustomButtonProps = {
  classes?: string;
  children?: React.ReactNode;
} & React.ComponentProps<"button">;

const Button = (props: CustomButtonProps) => {
  const { classes, children, ...rest } = props;
  return (
    <button className={clsx("qz-button", classes)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
