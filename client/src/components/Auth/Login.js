import React from "react";

const Login = () => {
    return (
        <form action="/signup">
            <h2>Zaloguj się</h2>
            <label for="email">Email</label>
            <input type="text" name="email" />
            <div class="email error"></div>
            <label for="password">Hasło</label>
            <input type="password" name="password" />
            <div class="password error"></div>
            <button>Zaloguj się</button>
        </form>
    );
};

export default Login;
