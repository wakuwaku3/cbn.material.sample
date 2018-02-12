import { Component } from "react";
import * as React from "react";
import { Route, Switch } from "react-router";
import { HomeIndex } from "../pages/home";
import { HomeAbout } from "../pages/home/about";
import { BrowserRouter } from "react-router-dom";

export class AppRouter extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={HomeIndex} />
                <Route exact path='/home/about' component={HomeAbout} />
            </Switch>
        );
    }
}