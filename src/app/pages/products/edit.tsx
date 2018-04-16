import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ProductsEdit } from './component/edit';
import { Url } from '../../masters/app-router';
import { productsIndexAction } from '../../actions/products/index-action';
import { dialogAction } from '../../actions/shared/dialog-action';

interface RouteParams {
    mode: 'create' | 'update' | 'detail';
    id?: string;
}
namespace InnerScope {
    export const component: React.SFC<
        RouteComponentProps<RouteParams>
    > = props => {
        let id = Number(props.match.params.id);
        return (
            <ProductsEdit
                mode={props.match.params.mode}
                id={id}
                navigationIndex={() => {
                    props.history.push(Url.productsSimpleIndex);
                }}
                navigationUpdate={() => {
                    props.history.push(Url.productsSimpleUpdate(id));
                }}
                navigationDetail={id => {
                    props.history.push(Url.productsSimpleDetail(id));
                }}
            />
        );
    };
}
export const ProductsSimpleEdit = InnerScope.component;
