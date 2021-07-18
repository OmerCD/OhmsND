import React from "react";
import Login, {ILoginInfo} from "../../components/authentication/Login";
import {useServicesProvider} from "../../context/services-context";
import {useAppDispatch} from "../../app/hooks";
import {setUserInfo} from "../../features/userInfoSlice";

export interface IAuthenticationPageProps{
    setLoginSuccess: (isSuccessful:boolean) => void;
}

function AuthenticationPage(props : IAuthenticationPageProps){
    const authService = useServicesProvider().authenticationService;
    const dispatch = useAppDispatch();
    const handleLogin = async (loginInfo: ILoginInfo) => {
        const loginResponse = await authService.login(loginInfo.username, loginInfo.password);
        dispatch(setUserInfo({...loginResponse}))
        props.setLoginSuccess(loginResponse.isSuccessful);
    }
    return(
        <>
            <Login onSubmit={handleLogin}/>
        </>
    )
}

export default AuthenticationPage;
