import React from 'react'
import Home from './home'
import About from './about'
import Movies from './movies'
import Login from './login'
import { Switch, Route } from "react-router";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/about">
                <About />
            </Route>
            <Route exact path="/movies">
                <Movies />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
        </Switch>
    );
};

export default Routes;