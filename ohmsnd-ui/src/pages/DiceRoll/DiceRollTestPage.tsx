import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../app/hooks";
import {selectBaseApi} from "../../features/axios/axiosSlice";
import DieService, {DieType, RollDiceCommandResponse} from "../../services/DieService";
import "./DieRollPage.css"

function DiceRollTestPage(){
    const [rollResult, setRollResult] = useState<RollDiceCommandResponse[]>([])
    const baseApi = useAppSelector(selectBaseApi);
    const dieService = new DieService(baseApi);
    const roll = async () => {
        const result = await dieService.rollDice({dice:[{count:5, dieType:DieType.D20}]});
        setRollResult(result);
    }
    let mapped;
    if (rollResult.length > 0){
        mapped = rollResult.map(value => {
            return (
                <div>
                    <div>
                        {value.dieResults.map(dieResult => {
                            return (
                                <div>
                                    <span>Result : {dieResult.value}</span>
                                    <span>Status : {dieResult.dieStatus}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div>Results :{value.value}</div>
                </div>
            )
        });
    }
    return (
        <>
            <div className='roll-button' onClick={roll}>Roll</div>
            <div>
                {mapped}
            </div>
        </>
    )
}

export default DiceRollTestPage;
