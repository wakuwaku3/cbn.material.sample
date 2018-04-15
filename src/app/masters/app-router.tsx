import { Component } from 'react';
import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { HomeSettings } from '../pages/home/setting';
// import { HomeIndex } from '../pages/home';
import { HomeAbout } from '../pages/home/about';
// import { ProductsIndex } from '../pages/products';
// import { ProductsEdit } from '../pages/products/edit';

export namespace Url {
    export const root = '/';
    const home = `${root}home`;
    export const homeAbout = `${home}/about`;
    export const homeSetting = `${home}/setting`;
    export const productsIndex = `${root}products`;
    export const productsCreate = `${productsIndex}/create`;
    export const productsUpdate = (id: number) =>
        `${productsIndex}/update/${id}`;
    export const productsDetail = (id: number) =>
        `${productsIndex}/detail/${id}`;
    export const productsEditTemplate = `${productsIndex}/:mode/:id?`;
}
namespace InnerScope {
    export const component: React.SFC = () => {
        return (
            <Switch>
                {/* <Route exact path={Url.root} component={HomeIndex} /> */}
                <Route exact path={Url.root} component={HomeAbout} />
                <Route exact path={Url.homeSetting} component={HomeSettings} />
                {/* <Route exact path={Url.productsIndex} component={ProductsIndex} />
                <Route exact path={Url.productsEditTemplate} component={ProductsEdit} /> */}
                <Redirect to={Url.root} />
            </Switch>
        );
    };
}
export const AppRouter = InnerScope.component;
