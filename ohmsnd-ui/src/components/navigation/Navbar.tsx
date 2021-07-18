import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";
import {CustomLink} from "./CustomLink";
import {useAppSelector} from "../../app/hooks";
import {selectUserInfo} from "../../features/userInfoSlice";

function Navbar() {
    const userState = useAppSelector(selectUserInfo);
    return (
        <>
            <div className='main-nav'>
                <Link to='/' className='main-nav_header'>Ohm's DnD</Link>
                <div>{userState.userInfo.username}</div>
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
