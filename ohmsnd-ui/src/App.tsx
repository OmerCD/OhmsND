import React from 'react';
import {Counter} from './features/counter/Counter';
import './App.css';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import CharacterInfoPage from "./pages/CharacterInfo/CharacterInfoPage";
import Navbar from "./components/navigation/Navbar";
import DiceRollTestPage from "./pages/DiceRoll/DiceRollTestPage";

function App() {
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
