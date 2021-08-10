import React from "react";
import "./Skill.scss";
import { ProficiencyType } from "../SavingThrows/SavingThrow";

export interface ISkillPropType {
  proficiencyType: ProficiencyType;
  modifier: string;
  title: string;
}

export default function Skill(props: ISkillPropType) {
  return (
    <div className="skill-line">
      <div className="skill-proficiency">
        <div className={ProficiencyType[props.proficiencyType]}></div>
      </div>
      <div className="modifier">+{props.modifier}</div>
      <div className="title">{props.title}</div>
    </div>
  );
}
