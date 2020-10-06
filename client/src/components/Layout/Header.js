import React from "react";

const Header = () => {
    return (
        <nav>
            <h1>
                <a href="/">Family budget manager</a>
            </h1>
            <ul>
                <li>Witaj, </li>
                <li>
                    <a href="/logout">Wyloguj się</a>
                </li>

                <li>
                    <a href="/login">Zaloguj się</a>
                </li>
                <li>
                    <a href="/signup" className="btn">
                        Zarejestruj się
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Header;
