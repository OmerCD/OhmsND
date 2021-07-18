import React, {Context, createContext, useContext} from "react";
import AuthenticationService from "../services/AuthenticationService";
import axios from "axios";
import {useBaseAxiosApi} from "./axios-context";

interface IServiceContext{
    authenticationService: AuthenticationService
}

const defaultAuthService = new AuthenticationService(axios.create(), axios.create({
    baseURL: process.env.REACT_APP_IDENTITY_API_ADDRESS,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}));
const defaultServices:IServiceContext = {
    authenticationService:defaultAuthService
}
export const ServicesContext : Context<IServiceContext> = createContext({
    authenticationService:defaultAuthService
})

export const ServicesProvider = ({children}:any) => {
    defaultServices.authenticationService.setBaseApi(useBaseAxiosApi());
    return(
        <ServicesContext.Provider value={defaultServices}>
            {children}
        </ServicesContext.Provider>
    )
}

export const useServicesProvider = ():IServiceContext => {
    return useContext(ServicesContext);
}
