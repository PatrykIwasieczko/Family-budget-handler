import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
    let history = useHistory();
    const [values, setValues] = useState({ email: "", name: "", password: "" });
    const [errors, setErrors] = useState({ email: "", name: "", password: "" });

    const handleSignupChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        setErrors({ email: "", name: "", password: "" });
        const { email, name, password } = values;

        try {
            const res = await fetch("http://localhost:8000/signup", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    name,
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
                    name: data.errors.name,
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
            <h2>Zarejestruj się</h2>
            <label htmlFor="email">Email</label>
            <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleSignupChange}
                required
            />
            <div className="email error">{errors.email}</div>
            <label htmlFor="name">Imię i nazwisko</label>
            <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleSignupChange}
                required
            />
            <div className="name error">{errors.name}</div>
            <label htmlFor="password">Hasło</label>
            <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleSignupChange}
                required
            />
            <div className="password error">{errors.password}</div>
            <button onClick={handleSignup}>Zarejestruj się</button>
        </form>
    );
};

export default Signup;
