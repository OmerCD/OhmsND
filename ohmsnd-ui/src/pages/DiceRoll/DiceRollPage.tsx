import React, { FC, useEffect, useRef, useState } from "react";
import DiceRoller, {
  DiceRollerRefType,
  IDiceThrowOptions,
} from "../../components/dice-roll/DiceRoller";
import { DieType, IRollDiceConfig } from "../../services/DieService";
import DiceRollerFab from "../../components/dice-roll/DiceRollerFab";
import DiceRollResultCard, {
  DiceRollResultContainer,
  IDiceRollResultCardPropType,
} from "../../components/dice-roll/result/DiceRollResultCard";
import CharacterTitle from "../../components/CharacterCreation/CharacterTitle/CharacterTitle";
import { AttributeColumn } from "../../components/CharacterCreation/FirstColumn/AttributeColumn";
import { IAttributeProps } from "../../components/CharacterCreation/FirstColumn/Attribute/Attribute";
import SecondContainer, {
  ISecondContainerPropType,
} from "../../components/CharacterCreation/SecondColumn/SecondContainer";
import {
  ISavingThrowPropType,
  ProficiencyType,
} from "../../components/CharacterCreation/SecondColumn/SavingThrows/SavingThrow";
import { ISkillContainerPropType } from "../../components/CharacterCreation/SecondColumn/Skills/SkillContainer";
import { ISkillPropType } from "../../components/CharacterCreation/SecondColumn/Skills/Skill";
function DiceRollPage() {
  const rollRef = useRef<DiceRollerRefType>(null);
  const rollDice = (options: IDiceThrowOptions[]) => {
    if (rollRef?.current !== null) {
      rollRef.current.rollDice(options);
    }
  };

  useEffect(() => {
    var atr: IAttributeProps[] = [];
    atr.push({
      base: "3",
      bonus: "16",
      title: "Strength",
    });
    atr.push({
      base: "3",
      bonus: "16",
      title: "Strength",
    });
    atr.push({
      base: "3",
      bonus: "16",
      title: "Strength",
    });
    atr.push({
      base: "3",
      bonus: "16",
      title: "Strength",
    });
    atr.push({
      base: "3",
      bonus: "16",
      title: "Strength",
    });
    atr.push({
      base: "3",
      bonus: "16",
      title: "Strength",
    });
    setAttributes(atr);
    const savingThrows: ISavingThrowPropType[] = [];
    savingThrows.push({
      modifier: "3",
      proficiencyType: ProficiencyType.Half,
      title: "STR",
    });

    savingThrows.push({
      modifier: "3",
      proficiencyType: ProficiencyType.Full,
      title: "STR",
    });
    savingThrows.push({
      modifier: "3",
      proficiencyType: ProficiencyType.None,
      title: "CON",
    });
    savingThrows.push({
      modifier: "3",
      proficiencyType: ProficiencyType.Half,
      title: "CHA",
    });
    savingThrows.push({
      modifier: "3",
      proficiencyType: ProficiencyType.Half,
      title: "INT",
    });
    savingThrows.push({
      modifier: "3",
      proficiencyType: ProficiencyType.Half,
      title: "DEX",
    });
    setSecondContainerProp(savingThrows);


     const skills: ISkillPropType[] = [];
     skills.push({
       modifier: "3",
       proficiencyType: ProficiencyType.Half,
       title: "STR",
     });

     skills.push({
       modifier: "3",
       proficiencyType: ProficiencyType.Full,
       title: "STR",
     });
     skills.push({
       modifier: "3",
       proficiencyType: ProficiencyType.None,
       title: "CON",
     });
     skills.push({
       modifier: "3",
       proficiencyType: ProficiencyType.Half,
       title: "CHA",
     });
     skills.push({
       modifier: "3",
       proficiencyType: ProficiencyType.Half,
       title: "INT",
     });
     skills.push({
       modifier: "3",
       proficiencyType: ProficiencyType.Half,
       title: "DEX",
     });
     setSkills(skills);



  }, []);

  const [attributes, setAttributes] = useState<IAttributeProps[]>([]);
  const [secondContainerProp, setSecondContainerProp] = useState<
    ISavingThrowPropType[]
  >([]);
 const [skills, setSkills] = useState<ISkillPropType[]>([]);
  return (
    <>
      <div className="main-container">
        <CharacterTitle
          classNameAndLevel="Barbarian 50"
          background="Acolyte"
          race="Goliath"
          alignment="True Natural"
          exp="5000"
          playerName="OmerCD"
        />
        <div className="general-container">
          <AttributeColumn Attributes={attributes} />
          <SecondContainer
            SavingThrows={secondContainerProp}
            Skills={skills}
            PassiveInsightValue={11}
            PassiveInvestigationValue={13}
            PassivePerceptionValue={11}
          />
        </div>
      </div>

      <DiceRoller ref={rollRef} />
      <DiceRollerFab roll={rollDice} />
      <DiceRollResultContainer />
    </>
  );
}

export default DiceRollPage;
