import * as React from 'react';
import { withStore } from '../../../../lib/shared/react-frxp';
import { productsIndexAction } from '../../../actions/products/index-action';
import { RouteComponentProps } from 'react-router';
import { Page } from '../../../components/layout/page';
import { PaneContainer } from '../../../components/layout/pane-container';
import { ProductsSearch } from '../component/search';
import { ProductsEdit } from '../component/edit';
import {
    WindowContainer,
    WindowItem
} from '../../../components/layout/window-item';
import { findDOMNode } from 'react-dom';

namespace InnerScope {
    interface State {
        mode: 'create' | 'update' | 'detail';
        id?: number;
        zIndexIndex: number;
        zIndexEdit: number;
    }
    export const component = withStore(productsIndexAction)(
        class extends React.Component<{}, State> {
            constructor(props) {
                super(props);
                this.state = { mode: 'create', zIndexIndex: 1, zIndexEdit: 0 };
            }
            render() {
                return (
                    <WindowContainer ref="parent">
                        <WindowItem
                            findParent={() => findDOMNode(this.refs.parent)}
                            width="66%"
                            height="66%"
                            left="33%"
                            top="33%"
                            zIndex={this.state.zIndexEdit}
                        >
                            <ProductsEdit
                                hiddenReturn
                                mode={this.state.mode}
                                id={this.state.id}
                                navigationUpdate={() => {
                                    this.setState({ mode: 'update' });
                                }}
                                navigationDetail={id => {
                                    productsIndexAction.next('search');
                                    this.setState({ mode: 'detail', id });
                                }}
                            />
                        </WindowItem>
                        <WindowItem
                            findParent={() => findDOMNode(this.refs.parent)}
                            zIndex={this.state.zIndexIndex}
                            width="66%"
                            height="66%"
                        >
                            <ProductsSearch
                                disabledAdd={this.state.mode === 'create'}
                                onAddClick={() => {
                                    this.setState({
                                        mode: 'create',
                                        zIndexIndex: 0,
                                        zIndexEdit: 1
                                    });
                                }}
                                onRowSelected={id => {
                                    this.setState({
                                        mode: 'detail',
                                        id,
                                        zIndexIndex: 0,
                                        zIndexEdit: 1
                                    });
                                }}
                            />
                        </WindowItem>
                    </WindowContainer>
                );
            }
        }
    );
}
export const ProductsWindowIndex = InnerScope.component;
