import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Header from "./components/Layout/Header";
import Main from "./components/Family/Main";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/main" component={Main} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
