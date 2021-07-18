import React, {useState} from 'react';
import {Counter} from './features/counter/Counter';
import './App.css';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import CharacterInfoPage from "./pages/CharacterInfo/CharacterInfoPage";
import Navbar from "./components/navigation/Navbar";
import DiceRollTestPage from "./pages/DiceRoll/DiceRollTestPage";
import {selectAuthenticationService, setAuthenticationBaseApi} from "./features/authentication/authenticationSlice";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import AuthenticationPage from "./pages/Authentication/AuthenticationPage";
import {selectBaseApi, setToken} from "./features/axios/axiosSlice";

function App() {
    const authService = useAppSelector(selectAuthenticationService);
    const baseApi = useAppSelector(selectBaseApi);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authService.isAuthenticated());
    const dispatch = useAppDispatch();
    if(!isAuthenticated)
        return (<AuthenticationPage setLoginSuccess={setIsAuthenticated}/>)
    dispatch(setToken(authService.getUserInfo().token));
    dispatch(setAuthenticationBaseApi(baseApi))
    return (
        <Router>
            <div>
                <Navbar/>
                <Switch>
                    <Route path='/random-character'>
                        <CharacterInfoPage/>
                    </Route>
                    <Route path='/test-page'>
                        Test Page
                    </Route>
                    <Route path='/dice-roll'>
                        <DiceRollTestPage/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
