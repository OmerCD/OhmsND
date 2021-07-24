import React, {ChangeEvent, FormEvent, useState} from "react";
import DieService, {DieType, RollDiceCommandResponse} from "../../services/DieService";
import "./DieRollPage.css"
import RollResult from "../../components/dice-roll/RollResult";
import {useBaseAxiosApi} from "../../context/axios-context";
import {useHubConnections} from "../../context/signalr-context";

interface IDieRollInputs {
    dieCount: number;
    dieType: DieType
}

function DiceRollTestPage() {
    const [rollResult, setRollResult] = useState<RollDiceCommandResponse[]>([])
    const [inputs, setInputs] = useState<IDieRollInputs>({dieCount: 1, dieType: DieType.D2})
    const baseApi = useBaseAxiosApi();
    const dieService = new DieService(baseApi);
    const roll = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await dieService.rollDice({dice: [{count: inputs.dieCount, dieType: Number(inputs.dieType)}]});
        setRollResult(result);
    }
    let mapped;
    if (rollResult.length > 0) {
        mapped = rollResult.map((value, index) => {
            return <RollResult key={index} rollResults={value}/>
        });
    }
    const handleChange = (event: any) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    }
    let dieTypeOptions = [];
    for (let item in DieType) {
        if (!isNaN(Number(item))) {
            dieTypeOptions.push((
                <option key={item} value={item}>{DieType[item]}</option>
            ))
        }
    }
    return (
        <>
            <form onSubmit={roll}>
                <div>
                    <label>Die Count</label>
                    <input type="number" name='dieCount' value={inputs.dieCount} onChange={handleChange}/>
                </div>
                <div>
                    <label>Die Type</label>
                    <select name='dieType' defaultValue={0} onChange={handleChange}>
                        {dieTypeOptions}
                    </select>
                </div>
                <button type={"submit"} className='roll-button'>Roll</button>
            </form>
            <div>
                {mapped}
            </div>
        </>
    )
}

export default DiceRollTestPage;
