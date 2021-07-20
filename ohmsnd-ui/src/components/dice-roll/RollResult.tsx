import React from "react";
import {RollDiceCommandResponse} from "../../services/DieService";
import './RollResult.css';

interface IRollResultProps {
    rollResults: RollDiceCommandResponse
}

enum Status {
    Fail, Normal, Success
}

const statusColorClasses = ['fail', 'normal', 'success'];

function RollResult(props: IRollResultProps) {
    const rollResults = props.rollResults;
    return (
        <div>
            <div className='die-results-container'>
                {rollResults.dieResults.map((dieResult, index) => {

                    return (
                        <div className='die-results-container_single' key={index}>
                            <span>{dieResult.value}</span>
                            <span
                                className={statusColorClasses[dieResult.dieStatus]}>{Status[dieResult.dieStatus]}</span>
                        </div>
                    )
                })}
            </div>
            <div className='die-result-overall'>Overall :{rollResults.value}</div>
        </div>
    )
}

export default RollResult;
