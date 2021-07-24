import React, {useEffect, useRef} from "react";
import DiceRoller, {DiceRollerRefType, IDiceThrowOptions} from "../../components/dice-roll/DiceRoller";
import {DieType, IRollDiceConfig} from "../../services/DieService";
import DiceRollerFab from "../../components/dice-roll/DiceRollerFab";

function DiceRollPage() {
    const rollRef = useRef<DiceRollerRefType>(null);
    const rollDice = (options: IDiceThrowOptions[]) => {
        if (rollRef?.current !== null) {
            rollRef.current.rollDice(options);
        }
    }
    useEffect(() => {

    }, []);
    return (
        <>
            <DiceRoller ref={rollRef}/>
            <DiceRollerFab roll={rollDice}/>
        </>
    )
}

export default DiceRollPage;
