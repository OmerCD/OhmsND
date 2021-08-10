import React from "react";
import SavingThrow, { ISavingThrowPropType } from "./SavingThrow";
import "./SavingThrow.scss";

export interface ISavingThrowContainerPropType {
  SavingThrows: ISavingThrowPropType[];
}

export default function SavingThrowContainer(
  props: ISavingThrowContainerPropType
) {
  return (
    <div className="saving-throw-container-wrapper">
      <div className="saving-throw-container">
        {props.SavingThrows.map((savingThrow) => (
          <SavingThrow {...savingThrow} />
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "-12px",color:"black" }}>
        <span
          style={{
            backgroundColor: "white",
            paddingLeft: "2px",
            paddingRight: "2px",
          }}
        >
          Saving Throws
        </span>
      </div>
    </div>
  );
}
