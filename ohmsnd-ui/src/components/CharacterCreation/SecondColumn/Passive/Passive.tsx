import React from "react";
import "./Passive.scss";

export interface IPassiveProp {
  Value: number;
  Text: string;
}

export default function Passive(props: IPassiveProp) {
  return (
    <div className="passive">
      <div className="value">{props.Value}</div>
      <div className="text">{props.Text}</div>
    </div>
  );
}
