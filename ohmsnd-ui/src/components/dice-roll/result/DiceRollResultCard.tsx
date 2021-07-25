import React, {useEffect, useRef, useState} from 'react';
import './DiceRollResultCard.css'
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {removeThrowInfo, selectThrows, ThrowsState} from "../../../features/throwsSlice";

export interface IDiceRollResultCardPropType {
    destroySelf?: (key: string) => void;
    id: string,
    title: string,
    actionType: string,
    actionTypeColor: string,
    values: string,
    result: string,
    dieTypes: string,
}

function DiceRollResultCard(props: IDiceRollResultCardPropType) {
    const ref = useRef(null);
    return (
        <div ref={ref} className='dice-result-card' onClick={event => {
            // @ts-ignore
            ref.current.classList.add('closing')

            setTimeout(() => {
                props.destroySelf?.(props.id)
            }, 2000)
        }}>
            <div className='dice-result-card_description'>
                <div className='dice-result-card_description_title'>
                    {props.title} <span style={{color: props.actionTypeColor}}>{props.actionType}</span>
                </div>
                <div className='dice-result-card_description_values'>
                    <span>{props.values}</span>
                </div>
                <div className='dice-result-card_description_dice-types'>
                    {props.dieTypes}
                </div>
            </div>
            <div className='dice-result-card_result'>{props.result}</div>
        </div>
    );
}


export default DiceRollResultCard;


interface IDiceRollResultContainerPropType {
    // cardInfos: IDiceRollResultCardPropType[]
}

function DiceRollResultContainer(props: IDiceRollResultContainerPropType) {
    // const [children, setChildren] = useState(props.cardInfos);
    const [queue, setQueue] = useState<string[]>([]);
    const throws:ThrowsState = useAppSelector(selectThrows);
    const dispatch = useAppDispatch();
    const removeChild = (id: string) => {
        queue.push(id)
        setQueue([...queue]);
    }

    useEffect(() => {
        let changed = false;
        for (let id of queue) {
            dispatch(removeThrowInfo(id));
            changed = true;
        }
        if (changed) {
            setQueue([]);
        }
    }, [queue])
    return (
        <div className='dice-result-card-container'>{
            throws.throwInfos.map(x => (
                <DiceRollResultCard key={x.id} {...x} destroySelf={removeChild}/>
            ))
        }</div>
    );
}

export {DiceRollResultContainer};
