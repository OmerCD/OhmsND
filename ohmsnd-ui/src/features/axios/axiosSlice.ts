import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface AxiosState {
    baseApi: AxiosInstance;
}

const initialState: AxiosState = {
    baseApi: axios.create({
        baseURL: process.env.REACT_APP_BASE_API_ADDRESS
    }),
};

const axiosSlice = createSlice({
    name: "axios",
    initialState,
    reducers: {
        setBaseApi(state, action: PayloadAction<AxiosRequestConfig>) {
            state.baseApi = axios.create(action.payload);
        }
    }
});

const selectBaseApi = (state: RootState) => state.axios.baseApi;

export {axiosSlice, selectBaseApi};
export default axiosSlice.reducer;

