import React, { useEffect } from "react";
import Attribute, { IAttributeProps } from "./Attribute/Attribute";
import "./AttributeColumn.scss";

export interface IFirstColumnPropType {
  Attributes: IAttributeProps[];
}
export function AttributeColumn(props: IFirstColumnPropType) {
  useEffect(() => {
    console.clear();
    console.log("sd");
    console.log(props);
  }, []);
  return (
    <div className="attribute-container">
      {props.Attributes.map((item) => (
        <Attribute title={item.title} base={item.base} bonus={item.bonus} />
      ))}
    </div>
  );
}
