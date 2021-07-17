import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";
import {CustomLink} from "./CustomLink";

function Navbar() {
    return (
        <>
            <div className='main-nav'>
                <Link to='/' className='main-nav_header'>Ohm's DnD</Link>
                <div className='main-nav_items'>
                    <CustomLink to='/random-character'>
                        Randomizer
                    </CustomLink>
                    <CustomLink to={"/test-page"}>
                        Test Page
                    </CustomLink>
                    <CustomLink to="/dice-roll">
                        Dice Roll
                    </CustomLink>
                </div>
            </div>
        </>
    )
}

export default Navbar;
