import React from "react";
import "./ThirdColumnContainer.scss";

interface IArmorClassPropType {
  Value: number;
}
export default function ArmorClass(props: IArmorClassPropType) {
  return <div className="armor-class">{props.Value}</div>;
}
