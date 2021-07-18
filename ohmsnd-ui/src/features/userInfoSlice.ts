import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

export interface UserInfoState {
    userInfo:IUserInformation
}

export interface IUserInformation{
    username?: string | null;
    token:string | null;
    fullName?:string | null;
}

const initialState: UserInfoState = {
    userInfo:{token:null, username:null, fullName:null,}
};

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUserInfo(state, action: PayloadAction<IUserInformation>){
            state.userInfo = action.payload;
        }
    }
});

const selectUserInfo = (state: RootState) => state.userInfo;

export const { setUserInfo} = userInfoSlice.actions;
export {userInfoSlice, selectUserInfo};
export default userInfoSlice.reducer;

