import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
    let history = useHistory();
    const [values, setValues] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });

    const handleLoginChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setErrors({ email: "", password: "" });
        const { email, password } = values;

        try {
            const res = await fetch("http://localhost:8000/login", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            console.log(data);
            if (data.errors) {
                setErrors({
                    email: data.errors.email,
                    password: data.errors.password,
                });
            }
            if (data.member) {
                history.push("/main");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form action="/signup">
            <h2>Zaloguj się</h2>
            <label htmlFor="email">Email</label>
            <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleLoginChange}
            />
            <div className="email error">{errors.email}</div>
            <label htmlFor="password">Hasło</label>
            <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleLoginChange}
            />
            <div className="password error">{errors.password}</div>
            <button onClick={handleLogin}>Zaloguj się</button>
        </form>
    );
};

export default Login;
