import { Component } from 'react';
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { HomeIndex } from '../pages/home';
import { HomeAbout } from '../pages/home/about';
import { HomeSettings } from '../pages/home/setting';
import { ProductsIndex } from '../pages/products';

export namespace Url {
    export const homeIndex = '/';
    export const homeAbout = '/home/about';
    export const homeSetting = '/home/setting';
    export const productsIndex = '/products';
}
namespace InnerScope {
    export const component: React.SFC = () => {
        return (
            <Switch>
                <Route exact path={Url.homeIndex} component={HomeIndex} />
                <Route exact path={Url.homeAbout} component={HomeAbout} />
                <Route exact path={Url.homeSetting} component={HomeSettings} />
                <Route
                    exact
                    path={Url.productsIndex}
                    component={ProductsIndex}
                />
            </Switch>
        );
    };
}
export const AppRouter = InnerScope.component;
