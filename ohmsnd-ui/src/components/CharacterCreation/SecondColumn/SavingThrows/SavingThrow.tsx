import React from "react";
import "./SavingThrow.scss";

export enum ProficiencyType {
  None,
  Half,
  Full,
}
export interface ISavingThrowPropType {
  proficiencyType: ProficiencyType;
  modifier: string;
  title: string;
}

export default function SavingThrow(props: ISavingThrowPropType) {
  return (
    <div className="saving-throw-line">
      <div className="skill-proficiency">
        <div className={ProficiencyType[props.proficiencyType]}></div>
      </div>
      <div className="modifier">+{props.modifier}</div>
      <div className="title">{props.title}</div>
    </div>
  );
}
