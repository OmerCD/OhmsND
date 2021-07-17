import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../app/hooks";
import {selectBaseApi} from "../../features/axios/axiosSlice";
import CharacterService from "../../services/CharacterService";
import {CharacterInfoModel} from "../../models/CharacterInfoModel";

function CharacterInfoPage(){
    const [characterInfo, setCharacterInfo] = useState<CharacterInfoModel | null>(null);
    const baseApi = useAppSelector(selectBaseApi);
    const characterService = new CharacterService(baseApi);
    useEffect(()=>{
        characterService.generateRandomCharacter().then(response => {
            setCharacterInfo(response);
        })
    },[])
    if(characterInfo === null){
        return (
            <h1>Loading...</h1>
        );
    }
    return (
        <>
            <h1>Character Info Page</h1>
            <h2>{characterInfo.firstName} {characterInfo.lastName}</h2>
            <h3>Level : {characterInfo.level}</h3>
        </>
    )
}

export default CharacterInfoPage;
