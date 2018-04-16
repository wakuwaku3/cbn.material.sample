import { Component } from 'react';
import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { HomeSettings } from '../pages/home/setting';
import { HomeIndex } from '../pages/home';
import { HomeAbout } from '../pages/home/about';
import { ProductsSimpleIndex } from '../pages/products';
import { ProductsSimpleEdit } from '../pages/products/edit';
import { ProductsPaneIndex } from '../pages/products/pane';
import { ProductsWindowIndex } from '../pages/products/window';

export namespace Url {
    export const root = '/';
    const home = `${root}home`;
    export const homeAbout = `${home}/about`;
    export const homeSetting = `${home}/setting`;
    export const productsSimpleIndex = `${root}products/simple`;
    export const productsSimpleCreate = `${productsSimpleIndex}/create`;
    export const productsSimpleUpdate = (id: number) =>
        `${productsSimpleIndex}/update/${id}`;
    export const productsSimpleDetail = (id: number) =>
        `${productsSimpleIndex}/detail/${id}`;
    export const productsEditTemplate = `${productsSimpleIndex}/:mode/:id?`;
    export const productsPaneIndex = `${root}products/pane`;
    export const productsWindowIndex = `${root}products/window`;
}
namespace InnerScope {
    export const component: React.SFC = () => {
        return (
            <Switch>
                <Route exact path={Url.root} component={HomeIndex} />
                <Route exact path={Url.homeAbout} component={HomeAbout} />
                <Route exact path={Url.homeSetting} component={HomeSettings} />
                <Route
                    exact
                    path={Url.productsSimpleIndex}
                    component={ProductsSimpleIndex}
                />
                <Route
                    exact
                    path={Url.productsEditTemplate}
                    component={ProductsSimpleEdit}
                />
                <Route
                    exact
                    path={Url.productsPaneIndex}
                    component={ProductsPaneIndex}
                />
                <Route
                    exact
                    path={Url.productsWindowIndex}
                    component={ProductsWindowIndex}
                />
                <Redirect to={Url.root} />
            </Switch>
        );
    };
}
export const AppRouter = InnerScope.component;
