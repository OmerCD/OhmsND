import React from "react";
import "./CharacterTitle.scss";
export interface ICharacterTitle {
  classNameAndLevel: string;
  background: string;
  playerName: string;
  race: string;
  alignment: string;
  exp: string;
}
export default function CharacterTitle(props: ICharacterTitle) {
  return (
    <div className="title-container">
      <div className="title-name-container"> Henry The Barbarian</div>
      <div className="title-atr-container">
        <div>
          <input disabled type="text" value={props.classNameAndLevel} />
          <label>CLASS & LEVEL</label>
        </div>
        <div>
          <input disabled type="text" value={props.background} />
          <label>background</label>
        </div>
        <div>
          <input disabled type="text" value={props.playerName} />
          <label>Player Name</label>
        </div>
        <div>
          <input disabled type="text" value={props.race} />
          <label>RACE</label>
        </div>
        <div>
          <input disabled type="text" value={props.alignment} />
          <label>Alignment</label>
        </div>
        <div>
          <input disabled type="text" value={props.exp} />
          <label>EXP Points</label>
        </div>
      </div>
    </div>
  );
}
