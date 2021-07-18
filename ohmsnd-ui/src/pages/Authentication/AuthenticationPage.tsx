import React from "react";
import Login, {ILoginInfo} from "../../components/authentication/Login";
import {useAppSelector} from "../../app/hooks";
import {selectAuthenticationService} from "../../features/authentication/authenticationSlice";

export interface IAuthenticationPageProps{
    setLoginSuccess: (isSuccessful:boolean) => void;
}

function AuthenticationPage(props : IAuthenticationPageProps){
    const authService = useAppSelector(selectAuthenticationService);
    const handleLogin = async (loginInfo: ILoginInfo) => {
        const isSuccess = await authService.login(loginInfo.username, loginInfo.password);
        props.setLoginSuccess(isSuccess);
    }
    return(
        <>
            <Login onSubmit={handleLogin}/>
        </>
    )
}

export default AuthenticationPage;
