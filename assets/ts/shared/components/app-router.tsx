import { Component } from 'react';
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { HomeIndex } from '../../pages/home';
import { HomeAbout } from '../../pages/home/about';

export namespace AppRouter {
    export const Component: React.SFC = () => {
        return (
            <Switch>
                <Route exact path="/" component={HomeIndex.Component} />
                <Route
                    exact
                    path="/home/about"
                    component={HomeAbout.Component}
                />
            </Switch>
        );
    };
}