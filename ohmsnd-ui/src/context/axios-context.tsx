import React, {Context, createContext, useContext} from "react";
import axios, {AxiosInstance} from "axios";
import AuthenticationService from "../services/AuthenticationService";
import {useServicesProvider} from "./services-context";

const defaultAxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_ADDRESS,
})
defaultAxiosInstance.interceptors.response.use(response => {

    return response;
}, error => {
    if(error.response.status === 401){
        new AuthenticationService( defaultAxiosInstance, undefined).logout();
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }
    return error;
})
export const AxiosApiContext:Context<AxiosInstance> = createContext(defaultAxiosInstance);

export const BaseApiProvider = ({children}:any) => {
    const authService = useServicesProvider().authenticationService;
    defaultAxiosInstance.interceptors.response.use(response => response,error => {
        if(error.response.status === 401) {
            authService.logout();
        }
    })
    return(
        <AxiosApiContext.Provider value={defaultAxiosInstance}>
            {children}
        </AxiosApiContext.Provider>
    )
}

export const useBaseAxiosApi = () : AxiosInstance => {
    return useContext(AxiosApiContext);
}
