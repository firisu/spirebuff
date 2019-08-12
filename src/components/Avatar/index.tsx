import React from "react";
import { Image } from "semantic-ui-react";

import ironclad from "./ironclad.png";
import silent from "./silent.png";
import defect from "./defect.png";

import "./style.scss";

interface Props {
  color?: string;
  char?: string;
}

const Avatar = (props: Props) => {
  const { color, char } = props;

  if (color === "red" || char === "IRONCLAD") {
    return (
      <Image
        src={ironclad}
        alt="ironclad avatar"
        avatar
        className="char-avatar"
      />
    );
  } else if (color === "green" || char === "THE_SILENT") {
    return (
      <Image src={silent} alt="silent avatar" avatar className="char-avatar" />
    );
  } else if (color === "blue" || char === "DEFECT") {
    return (
      <Image src={defect} alt="defect avatar" avatar className="char-avatar" />
    );
  }

  return null;
};

export default Avatar;
