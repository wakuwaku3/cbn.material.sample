import { Component } from 'react';
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { HomeIndex } from '../pages/home';
import { HomeAbout } from '../pages/home/about';
import { ProductsIndex } from '../pages/products';

export namespace AppRouter {
    export const homeIndex = '/';
    export const homeAbout = '/home/about';
    export const productsIndex = '/products';
    export const component: React.SFC = () => {
        return (
            <Switch>
                <Route exact path={homeIndex} component={HomeIndex.component} />
                <Route exact path={homeAbout} component={HomeAbout.component} />
                <Route
                    exact
                    path={productsIndex}
                    component={ProductsIndex.component}
                />
            </Switch>
        );
    };
}
