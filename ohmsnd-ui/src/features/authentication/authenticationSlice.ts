import AuthenticationService from "../../services/AuthenticationService";
import axios, {AxiosInstance} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface AuthenticationState{
    authenticationService: AuthenticationService
}
const initialState: AuthenticationState = {
    authenticationService: new AuthenticationService(token => {}, axios.create(), axios.create({
        baseURL: process.env.REACT_APP_IDENTITY_API_ADDRESS,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }))
}

const authenticationSlice = createSlice({
    name:"authenticationService",
    initialState,
    reducers:{
        setAuthenticationService(state, action: PayloadAction<AuthenticationState>){
            // @ts-ignore
            state.authenticationService = action.payload;
        },
        setAuthenticationBaseApi(state, action: PayloadAction<AxiosInstance>){
            state.authenticationService.setBaseApi(action.payload);
        }
    }
});

const selectAuthenticationService = (state: RootState) => state.authenticationService.authenticationService;
export const {setAuthenticationBaseApi} = authenticationSlice.actions;
export {authenticationSlice, selectAuthenticationService};
export default authenticationSlice.reducer;
