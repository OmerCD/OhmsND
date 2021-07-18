import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import CharacterInfoPage from "./pages/CharacterInfo/CharacterInfoPage";
import Navbar from "./components/navigation/Navbar";
import DiceRollTestPage from "./pages/DiceRoll/DiceRollTestPage";
import AuthenticationPage from "./pages/Authentication/AuthenticationPage";
import {useBaseAxiosApi} from "./context/axios-context";
import {useServicesProvider} from "./context/services-context";

function App() {
    const authService = useServicesProvider().authenticationService;
    const baseApi = useBaseAxiosApi();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authService.isAuthenticated());
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
                        <DiceRollTestPage/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
