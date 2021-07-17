import {Link, useLocation} from "react-router-dom";
import React from "react";

interface ICustomLinkProps {
    to: string;
    className?: string;
    children: any;
}
export function CustomLink(props: ICustomLinkProps) {
    const location = useLocation();
    const path = location.pathname;
    return (
        <Link to={props.to} className={`main-nav__item ${props.className} ${path === props.to ? "active" : ""}`}>
            <span>{props.children}</span>
        </Link>
    )
}
