import React from "react";

const Signup = () => {
    return (
        <form action="/signup">
            <h2>Zarejestruj się</h2>
            <label for="email">Email</label>
            <input type="text" name="email" required />
            <div class="email error"></div>
            <label for="name">Imię i nazwisko</label>
            <input type="text" name="name" required />
            <div class="name error"></div>
            <label for="password">Hasło</label>
            <input type="password" name="password" required />
            <div class="password error"></div>
            <button>Zarejestruj się</button>
        </form>
    );
};

export default Signup;
