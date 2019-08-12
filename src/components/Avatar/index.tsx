import React from "react";

import ironclad from "./ironclad.png";
import silent from "./silent.png";
import defect from "./defect.png";

interface Props {
  color?: string;
  char?: string;
}

const Avatar = (props: Props) => {
  const { color, char } = props;

  if (color === "red" || char === "IRONCLAD") {
    return <img src={ironclad} alt="ironclad avatar" />;
  } else if (color === "green" || char === "THE_SILENT") {
    return <img src={silent} alt="silent avatar" />;
  } else if (color === "blue" || char === "DEFECT") {
    return <img src={defect} alt="defect avatar" />;
  }

  return null;
};

export default Avatar;
