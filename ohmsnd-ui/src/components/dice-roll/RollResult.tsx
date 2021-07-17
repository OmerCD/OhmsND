import React from "react";
import {RollDiceCommandResponse} from "../../services/DieService";
import './RollResult.css';

interface IRollResultProps{
    rollResults: RollDiceCommandResponse
}

function RollResult(props: IRollResultProps){
    const rollResults = props.rollResults;
    return  (
        <div>
            <div>
                {rollResults.dieResults.map(dieResult => {
                    return (
                        <div>
                            <span>Result : {dieResult.value}</span>
                            <span>Status : {dieResult.dieStatus}</span>
                        </div>
                    )
                })}
            </div>
            <div>Overall :{rollResults.value}</div>
        </div>
    )
}

export default RollResult;
