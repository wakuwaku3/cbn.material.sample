import * as React from 'react';
import { withStore } from '../../../lib/shared/react-frxp';
import { productsIndexAction } from '../../actions/products/index-action';
import { RouteComponentProps } from 'react-router';
import { ProductsSearch } from './component/search';
import { Url } from '../../masters/app-router';

namespace InnerScope {
  export const component = withStore(productsIndexAction)<
    RouteComponentProps<{}>
  >(props => {
    return (
      <ProductsSearch
        onAddClick={() => props.history.push(Url.productsSimpleCreate)}
        onRowDoubleClick={id =>
          props.history.push(Url.productsSimpleDetail(id))
        }
      />
    );
  });
}
export const ProductsSimpleIndex = InnerScope.component;
