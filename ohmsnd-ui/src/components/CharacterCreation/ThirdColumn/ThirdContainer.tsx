import React from "react";
import ArmorClass from "./ArmorClass";
import InsSpdContainer from "./ins-spd/InsSpdContainer";
import "./ThirdColumnContainer.scss";

export interface IThirdColumnContainerPropType {
  ArmorClassValue: number;
  InitiativeValue: number;
  SpeedValue: number;
  CurrentHp: number;
  MaxHp: number;
}

export default function ThirdContainer(
  props: IThirdColumnContainerPropType
) {
  return (
    <div className="third-bar-container">
      <div className="ac-inv-spd-container">
        <ArmorClass Value={props.ArmorClassValue} />
        <InsSpdContainer Title="Initiative" Value={"+"+props.InitiativeValue} />
        <InsSpdContainer Title="Speed" Value={props.SpeedValue+" ft"} />
        <InsSpdContainer Title="Current HP" Value={props.CurrentHp.toString()} />
        <InsSpdContainer Title="Max HP" Value={props.MaxHp.toString()} />
      </div>
    </div>
  );
}
