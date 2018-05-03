import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { HomeSettings } from '../pages/home/setting';
import { HomeIndex } from '../pages/home';
import { ProductsSimpleIndex } from '../pages/products';
import { ProductsSimpleEdit } from '../pages/products/edit';
import { ProductsPaneIndex } from '../pages/products/pane';
import { ProductsWindowIndex } from '../pages/products/window';

export namespace Url {
  export const root = '/';
  const home = `${root}home`;
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
        <Route exact={true} path={Url.root} component={HomeIndex} />
        <Route exact={true} path={Url.homeSetting} component={HomeSettings} />
        <Route
          exact={true}
          path={Url.productsSimpleIndex}
          component={ProductsSimpleIndex}
        />
        <Route
          exact={true}
          path={Url.productsEditTemplate}
          component={ProductsSimpleEdit}
        />
        <Route
          exact={true}
          path={Url.productsPaneIndex}
          component={ProductsPaneIndex}
        />
        <Route
          exact={true}
          path={Url.productsWindowIndex}
          component={ProductsWindowIndex}
        />
        <Redirect to={Url.root} />
      </Switch>
    );
  };
}
export const AppRouter = InnerScope.component;
