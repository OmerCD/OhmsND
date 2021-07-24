import React, {Context, createContext, useContext} from "react";
import * as signalR from "@microsoft/signalr";
import {HubConnection} from "@microsoft/signalr";

const dieRollHubAddress = process.env.REACT_APP_DIEROLLHUB_ADDRESS;
if (!dieRollHubAddress) {
    console.error("No die roll address defined");
}
const dieRollConnection = new signalR.HubConnectionBuilder()
    .withUrl(dieRollHubAddress as string)
    .configureLogging(signalR.LogLevel.Information)
    .build();

export interface ISignalRServices {
    dieHub: HubConnection
}

const dieHubDefault = {
    dieHub: dieRollConnection
};
export const HubConnectionsContext: Context<ISignalRServices> = createContext(dieHubDefault)

export const HubConnectionsProvider = ({children}: any) => {
    if (dieHubDefault.dieHub.state === 'Disconnected') {
        dieHubDefault.dieHub.start();
    }
    return (
        <HubConnectionsContext.Provider value={dieHubDefault}>
            {children}
        </HubConnectionsContext.Provider>
    )
}

export const useHubConnections = () => {
    return useContext(HubConnectionsContext);
}
