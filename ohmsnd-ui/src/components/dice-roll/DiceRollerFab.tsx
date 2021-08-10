import React, {useState} from 'react';
import './DiceRollerFab.css';
import {useBaseAxiosApi} from "../../context/axios-context";
import DieService, {DieType, IDieRoll} from "../../services/DieService";
import {IDiceThrowOptions} from "./DiceRoller";

interface IDiceRollerFabPropType{
    roll:(options: IDiceThrowOptions[]) => void
}

function DiceRollerFab(props:IDiceRollerFabPropType) {
    const [hidden, setHidden] = useState<boolean>(true);
    const [counts, setCounts] = useState({});
    const [showRollButton, setShowRollButton] = useState<boolean>(false);
    const baseApi = useBaseAxiosApi();
    const dieService = new DieService(baseApi);
    const handleCountChange = (count:number, key:string) => {
        if(count === 0){
            // @ts-ignore
            delete counts[key];
            setCounts({...counts});
            if(Object.keys(counts).length === 0){
                setShowRollButton(false);
            }
        }
        else {
            setShowRollButton(true);
            setCounts({...counts, [key]: count})
        }
    }
    const handleRollClick = async () => {
        const list:IDieRoll[] = [];
        const keys = Object.keys(counts);

        for (const prop in counts){
            // @ts-ignore
            list.push({count:counts[prop], dieType: DieType[prop.toUpperCase()]})
        }
        const response = await dieService.rollDice({
            dice:list
        })
        const options:IDiceThrowOptions[] = response.flatMap(x=>x.dieResults).map((item,index) => {
            return {
                value: item.value,
                // @ts-ignore
                type: item.dieType
            }
        })
        console.log("Dice Options",options)
        props.roll(options);
    }
    return (
        <div className={`roll-fab-container`}>
            <div className={`roll-fab ${!hidden ? 'close' : ''}`} onClick={() => setHidden(!hidden)}></div>
            <div className={`roll-menu-container ${hidden ? 'hidden' : 'openning'}`}>
                <ContainerDieFab hideCount={hidden} countChanged={handleCountChange} text='d4'></ContainerDieFab>
                <ContainerDieFab hideCount={hidden} countChanged={handleCountChange} text='d6'></ContainerDieFab>
                <ContainerDieFab hideCount={hidden} countChanged={handleCountChange} text='d8'></ContainerDieFab>
                <ContainerDieFab hideCount={hidden} countChanged={handleCountChange} text='d10'></ContainerDieFab>
                <ContainerDieFab hideCount={hidden} countChanged={handleCountChange} text='d12'></ContainerDieFab>
                <ContainerDieFab hideCount={hidden} countChanged={handleCountChange} text='d20'></ContainerDieFab>
            </div>
            <div className={`roll-fab-action-button ${(showRollButton && !hidden) ? '' : 'd-none'}`} onClick={handleRollClick}>Roll</div>
        </div>
    );
}

interface IContainerDieFabPropType {
    text: string,
    hideCount: boolean
    countChanged: (count:number, key:string) => void;
}

function ContainerDieFab(props: IContainerDieFabPropType) {
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const handleClick = (value: number) => {
        const newValue = count + value;
        if (newValue > 20 || newValue < 0) return;
        setCount(newValue);
        props.countChanged(newValue, props.text);
    }
    return (
        <div className={`roll-menu-container_die-fab ${props.text.toLowerCase()}`}
             onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}
             onContextMenu={(e) => {
                 e.preventDefault();
                 handleClick(-1);
             }
             } onClick={() => handleClick(1)}>
            <div
                className={`roll-menu-container_die-fab_count ${(props.hideCount || count <= 0) ? 'd-none' : ''}`}>{count}</div>
            <div className={`roll-menu-container_die-fab_bubble ${!isHovering ? 'd-none' : ''}`}>
                {props.text.toUpperCase()}
                <div className='roll-menu-container_die-fab_bubble_pip'></div>
            </div>
        </div>
    )
}

export default DiceRollerFab;
