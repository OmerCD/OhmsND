import React from "react";
import "./Attribute.scss";

export interface IAttributeProps {
  title: string;
  bonus: string;
  base: string;
}

export default function Attribute(props: IAttributeProps) {
  return (
    <div className="attribute">
      <div className="title">{props.title}</div>
      <div className="bonus">+{props.bonus}</div>
      <div className="base">{props.base}</div>
    </div>
  );
}
