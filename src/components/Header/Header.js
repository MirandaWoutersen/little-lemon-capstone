import React from "react";
import "./Header.css";
import Nav from "../Nav/Nav";
import Logo from "../../assets/Logo.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const onClickImage = () => {
        navigate("/");
    };

    return (
        <header className="header">
        <div className="logo">
            <img src={Logo} alt="logo" height={50} onClick={onClickImage} />
        </div>
        <Nav />
        </header>
    );
};

export default Header;