import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

const ProgressBar = ({
  percentage,
  children,
}: {
  percentage: number;
  children: React.ReactNode;
}) => {
  return (
    <CircularProgressbarWithChildren
      value={percentage}
      maxValue={100}
      className="p-2"
      styles={buildStyles({
        pathColor: "#47B77B",
        trailColor: "#F3F3FA",
      })}
    >
      {children}
    </CircularProgressbarWithChildren>
  );
};

export default ProgressBar;
