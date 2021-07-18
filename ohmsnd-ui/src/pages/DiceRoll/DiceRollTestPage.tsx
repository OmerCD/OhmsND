import React, {useState} from "react";
import DieService, {DieType, RollDiceCommandResponse} from "../../services/DieService";
import "./DieRollPage.css"
import RollResult from "../../components/dice-roll/RollResult";
import {useBaseAxiosApi} from "../../context/axios-context";

function DiceRollTestPage(){
    const [rollResult, setRollResult] = useState<RollDiceCommandResponse[]>([])
    const baseApi = useBaseAxiosApi();
    const dieService = new DieService(baseApi);
    const roll = async () => {
        const result = await dieService.rollDice({dice:[{count:5, dieType:DieType.D20}]});
        setRollResult(result);
    }
    let mapped;
    if (rollResult.length > 0){
        mapped = rollResult.map(value => { return <RollResult rollResults={value}/>});
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
