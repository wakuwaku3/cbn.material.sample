import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { decorate } from '../../helper/app-style-helper';
import { WithStyles } from 'material-ui';
import { Cbn } from '../../../lib/shared/cbn';
import { Product } from '../../models/actions/products';
import { Page } from '../../components/layout/page';

namespace InnerScope {
    interface Style {}
    const style: Style = {};
    interface RouteParams {
        mode: 'create' | 'update' | 'detail';
        id?: number;
    }
    interface Props {}
    interface Event {
        initialize: RouteParams;
    }
    interface State extends Product {}

    export const styledComponent = decorate(style)(
        sheet =>
            class extends React.Component<Props & RouteComponentProps<RouteParams>, State> {
                emitter = new Cbn.EventEmitter<Event>();
                constructor(props) {
                    super(props);
                    this.emitter.observe('initialize').subscribe(() => {});
                    this.emitter.emit('initialize', this.routeParams);
                }
                render() {
                    return this.getElement();
                }
                getElement = () => (
                    <Page title={this.title} loading={!this.state}>
                        x
                    </Page>
                );
                get routeParams() {
                    return this.props.match.params;
                }
                get title() {
                    let mode = '';
                    switch (this.routeParams.mode) {
                        case 'create':
                            mode = '新規作成';
                            break;
                        case 'detail':
                            mode = '詳細';
                            break;
                        case 'update':
                            mode = '更新';
                            break;
                    }
                    return `製品${mode}`;
                }
            }
    );
}
export const ProductsEdit = InnerScope.styledComponent;
