import { Component } from 'react';
import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { HomeIndex } from '../pages/home';
import { HomeAbout } from '../pages/home/about';
import { HomeSettings } from '../pages/home/setting';
import { ProductsIndex } from '../pages/products';
import { ProductsEdit } from '../pages/products/edit';

export namespace Url {
    export const homeIndex = '/';
    export const homeAbout = '/home/about';
    export const homeSetting = '/home/setting';
    export const productsIndex = '/products';
    export const productsCreate = '/products/create';
    export const productsEdit = '/products/:mode/:id';
}
namespace InnerScope {
    export const component: React.SFC = () => {
        return (
            <Switch>
                <Route exact path={Url.homeIndex} component={HomeIndex} />
                <Route exact path={Url.homeAbout} component={HomeAbout} />
                <Route exact path={Url.homeSetting} component={HomeSettings} />
                <Route exact path={Url.productsIndex} component={ProductsIndex} />
                <Route exact path={Url.productsCreate} component={ProductsEdit} />
                <Route exact path={Url.productsEdit} component={ProductsEdit} />
                <Redirect to={Url.homeIndex} />
            </Switch>
        );
    };
}
export const AppRouter = InnerScope.component;
