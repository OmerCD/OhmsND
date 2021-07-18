import React, {ChangeEvent, FormEvent, useState} from 'react';
import './Login.css';

export interface ILoginProps {
    onSubmit : (loginInfo: ILoginInfo) => void;
}

export interface ILoginInfo {
    username:string;
    password:string;
}

function Login(props: ILoginProps) {
    const [loginInfo, setLoginInfo] = useState<ILoginInfo>({username: 'Bob', password: 'Pass123$'})
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit(loginInfo);
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({
            ...loginInfo,
            [event.target.name]: event.target.value
        })
    }
    return (
        <>
            <div className='login-container'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className='login-form_field'>
                        <span>User Name</span>
                        <input value={loginInfo.username} name='username' onChange={handleChange}/>
                    </div>
                    <div className='login-form_field'>
                        <span>Password</span>
                        <input value={loginInfo.password} name='password' type='password' onChange={handleChange}/>
                    </div>
                    <div className='button-container'>
                    <button type='submit' className='login-form_login-button'>Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;
