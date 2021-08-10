import React from "react";
import Skill, { ISkillPropType } from "./Skill";
import "./Skill.scss";

export interface ISkillContainerPropType {
  Skills: ISkillPropType[];
}

export default function SkillContainer(props: ISkillContainerPropType) {
  return (
    <div className="skill-container-wrapper">
      <div className="skill-container">
        {props.Skills.map((savingThrow) => (
          <Skill {...savingThrow} />
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "-12px", color: "black" }}>
        <span
          style={{
            backgroundColor: "white",
            paddingLeft: "2px",
            paddingRight: "2px",
          }}
        >
          Skills
        </span>
      </div>
    </div>
  );
}
