import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import CharacterInfoPage from "./pages/CharacterInfo/CharacterInfoPage";
import Navbar from "./components/navigation/Navbar";
import DiceRollTestPage from "./pages/DiceRoll/DiceRollTestPage";
import AuthenticationPage from "./pages/Authentication/AuthenticationPage";
import {useBaseAxiosApi} from "./context/axios-context";
import {useServicesProvider} from "./context/services-context";
import {useHubConnections} from "./context/signalr-context";
import DiceRollPage from "./pages/DiceRoll/DiceRollPage";

function App() {
    const authService = useServicesProvider().authenticationService;
    const baseApi = useBaseAxiosApi();
    const signalRHubs = useHubConnections();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authService.isAuthenticated());
    useEffect(()=>{
        if(isAuthenticated){
            signalRHubs.dieHub.on("DieRolled", args => {
                console.log(args);
            })
        }
    });
    if(!isAuthenticated)
        return (<AuthenticationPage setLoginSuccess={setIsAuthenticated}/>)
    baseApi.defaults.headers["Authorization"] = `Bearer ${authService.getUserInfo().token}`;
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
                        <DiceRollPage/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
