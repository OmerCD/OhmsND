import React from "react";
import Passive, { IPassiveProp } from "./Passive/Passive";
import { ISavingThrowPropType } from "./SavingThrows/SavingThrow";
import SavingThrowContainer, {
  ISavingThrowContainerPropType,
} from "./SavingThrows/SavingThrowContainer";
import "./SecondContainer.scss";
import { ISkillPropType } from "./Skills/Skill";
import SkillContainer from "./Skills/SkillContainer";

export interface ISecondContainerPropType {
  SavingThrows: ISavingThrowPropType[];
  PassivePerceptionValue: number;
  PassiveInvestigationValue: number;
  PassiveInsightValue: number;
  Skills: ISkillPropType[];
}
export default function SecondContainer(props: ISecondContainerPropType) {
  return (
    <div className="second-bar-container">
      <SavingThrowContainer SavingThrows={props.SavingThrows} />
      <Passive
        Text={"PASSIVE WIS (PERCEPTION)"}
        Value={props.PassivePerceptionValue}
      />
      <Passive
        Text={"PASSIVE INT (INVESTIGATION)"}
        Value={props.PassiveInvestigationValue}
      />
      <Passive
        Text={"PASSIVE WIS (INSIGHT)"}
        Value={props.PassiveInsightValue}
      />
      <SkillContainer Skills={props.Skills} />
    </div>
  );
}
