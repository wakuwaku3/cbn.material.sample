import * as React from 'react';
import { withStore } from '../../../../lib/shared/react-frxp';
import { productsIndexAction } from '../../../actions/products/index-action';
import { RouteComponentProps } from 'react-router';
import { Page } from '../../../components/layout/page';
import { PaneContainer } from '../../../components/layout/pane-container';
import { ProductsSearch } from '../component/search';
import { ProductsEdit } from '../component/edit';

namespace InnerScope {
    interface State {
        mode: 'create' | 'update' | 'detail';
        id?: number;
    }
    export const component = withStore(productsIndexAction)(
        class extends React.Component<{}, State> {
            constructor(props) {
                super(props);
                this.state = { mode: 'create' };
            }
            render() {
                return (
                    <Page title="製品" loading={!productsIndexAction.store}>
                        <PaneContainer
                            elements={[
                                <ProductsSearch
                                    hiddenHeader
                                    disabledAdd={this.state.mode === 'create'}
                                    onAddClick={() =>
                                        this.setState({ mode: 'create' })
                                    }
                                    onRowSelected={id =>
                                        this.setState({ mode: 'detail', id })
                                    }
                                />,
                                <ProductsEdit
                                    hiddenHeader
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
                            ]}
                        />
                    </Page>
                );
            }
        }
    );
}
export const ProductsPaneIndex = InnerScope.component;
