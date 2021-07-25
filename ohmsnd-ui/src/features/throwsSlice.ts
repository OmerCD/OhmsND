import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

export interface ThrowsState {
    throwInfos: IThrowInfo[]
}

export interface IThrowInfo {
    id: string,
    title: string,
    actionType: string,
    actionTypeColor: string,
    values: string,
    result: string,
    dieTypes: string,
}

const initialState: ThrowsState = {
    throwInfos: []
};

const throwsSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        pushThrowInfo(state, action: PayloadAction<IThrowInfo>) {
            state.throwInfos = [...state.throwInfos, action.payload];
        },
        removeThrowInfo(state, action: PayloadAction<string>) {
            state.throwInfos = state.throwInfos.filter(x => x.id != action.payload);
        }
    }
});

const selectThrows = (state: RootState) => state.throws;

export const {pushThrowInfo, removeThrowInfo} = throwsSlice.actions;
export {throwsSlice, selectThrows};
export default throwsSlice.reducer;

