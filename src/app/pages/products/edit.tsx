import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Page } from '../../components/layout/page';
import {
    AppGrid,
    AppButton,
    AppTextField,
    AppSelect,
    AppInputLabel,
    AppInput,
    AppMenuItem,
    AppFormControl,
    AppTableRow
} from '../../components/material-ui/wrapper';
import { FieldSet } from '../../components/form-control/fieldset';
import { TableContainer } from '../../components/table-control/table-container';
import { AddIcon, RemoveIcon } from '../../components/material-ui/icon-wrapper';
import {
    HeadCellProps,
    HeadCell
} from '../../components/table-control/head-cell';
import { CheckedCell } from '../../components/table-control/checked-cell';
import { Selectable } from '../../../lib/models/selectable';
import { Cell } from '../../components/table-control/cell';
import { RadioFormGroup } from '../../components/form-control/radio-form-group';
import { Adjuster, AdjusterProps } from '../../components/layout/adjuster';
import {
    Products,
    Product,
    ProductVersion
} from '../../services/products-service';
import { messagesAction } from '../../actions/shared/messages-action';
import { Url } from '../../masters/app-router';
import { productsIndexAction } from '../../actions/products/index-action';
import { dialogAction } from '../../actions/shared/dialog-action';
import { Subscription } from 'rxjs';
import { decorate } from '../../../lib/shared/style-helper';
import { StyledEventComponentBase } from '../../../lib/bases/event-component-base';
import { observeWindow } from '../../../lib/shared/window-helper';

namespace InnerScope {
    interface Style {
        action;
        'table-action';
        status;
    }
    const style: Style = {
        action: {
            display: 'flex',
            '& button': {
                margin: 5
            },
            '& button:first-child': {
                'margin-left': 0
            },
            '& button:last-child': {
                'margin-right': 0
            }
        },
        'table-action': {
            display: 'flex'
        },
        status: {}
    };
    interface RouteParams {
        mode: 'create' | 'update' | 'detail';
        id?: string;
    }
    interface Props {}
    interface Event {
        initialize: RouteParams;
        beforeUnload: BeforeUnloadEvent;
        sizeChange: { index: number; width: number };
        selectAll: React.ChangeEvent<HTMLInputElement>;
        selectRow: { index: number; selected: boolean };
        changeProduct: {
            name: keyof Product<Version>;
            value;
        };
        changeVersion: {
            index: number;
            name: keyof Version;
            value;
        };
        clickAdd: void;
        clickRemove: void;
        clickExecute: void;
        clickReset: void;
        navigationIndex: void;
        navigationUpdate: void;
        navigationDetail: void;
        navigation: string;
        create: void;
        createCallback: void;
        update: void;
        updateCallback: void;
    }
    interface State {
        columns: number[];
        product?: Product<Version>;
        preProduct?: string;
    }
    interface Version extends ProductVersion, Selectable {}
    export const component = decorate(style)(
        class extends StyledEventComponentBase<
            Event,
            Style,
            Props & RouteComponentProps<RouteParams>,
            State
        > {
            beforeUnloadSubscription: Subscription;
            constructor(props) {
                super(props);
                this.state = { columns: [50, 200, 200, 200] };
            }
            componentWillMount() {
                if (super.componentWillMount) super.componentWillMount();
                this.next('clickReset');
            }
            componentDidMount() {
                if (super.componentDidMount) super.componentDidMount();
                this.beforeUnloadSubscription = observeWindow(
                    'beforeunload'
                ).subscribe(e => this.next('beforeUnload', e));
            }
            componentWillUnmount() {
                if (super.componentWillUnmount) super.componentWillUnmount();
                this.beforeUnloadSubscription.unsubscribe();
            }
            protected setupObservable() {
                this.observe('beforeUnload').subscribe(e => {
                    let value = this.checkChanged();
                    if (value) {
                        e.returnValue = value;
                    }
                });
                this.observe('sizeChange').subscribe(({ index, width }) => {
                    let columns = this.state.columns;
                    columns[index] = width;
                    this.setState({ columns });
                });
                this.observe('selectAll').subscribe(e => {
                    this.state.product.productVersions.forEach(
                        x => (x.isSelected = e.target.checked)
                    );
                    this.setState({ product: this.state.product });
                });
                this.observe('selectRow').subscribe(({ index, selected }) => {
                    this.state.product.productVersions[
                        index
                    ].isSelected = selected;
                    this.setState({ product: this.state.product });
                });
                this.observe('changeProduct').subscribe(({ name, value }) => {
                    this.state.product[name] = value;
                    this.setState({ product: this.state.product });
                });
                this.observe('changeVersion').subscribe(
                    ({ index, name, value }) => {
                        this.state.product.productVersions[index][name] = value;
                        this.setState({ product: this.state.product });
                    }
                );
                this.observe('clickAdd').subscribe(() => {
                    this.state.product.productVersions.push(
                        this.createNewVersion()
                    );
                    this.setState({ product: this.state.product });
                });
                this.observe('clickRemove').subscribe(() => {
                    this.state.product.productVersions = this.state.product.productVersions.filter(
                        x => !x.isSelected
                    );
                    this.setState({ product: this.state.product });
                });
                this.observe('clickExecute').subscribe(() => {
                    switch (this.mode) {
                        case 'create':
                            this.next('create');
                            break;
                        case 'update':
                            this.next('update');
                            break;
                    }
                });
                this.observe('create').subscribe(() => {
                    dialogAction.next('showYesNo', {
                        title: '製品情報登録',
                        text: '製品情報を登録します。よろしいですか？',
                        callBack: yes => {
                            if (yes) {
                                this.next('createCallback');
                            }
                        }
                    });
                });
                this.observe('createCallback').subscribe(async () => {
                    await Products.service.createAsync(this.state.product);
                    messagesAction.next('showMessage', {
                        text: '製品を登録しました。',
                        level: 'info'
                    });
                    this.next('navigationDetail');
                });
                this.observe('update').subscribe(() => {
                    dialogAction.next('showYesNo', {
                        title: '製品情報更新',
                        text: '製品情報を更新します。よろしいですか？',
                        callBack: yes => {
                            if (yes) {
                                this.next('updateCallback');
                            }
                        }
                    });
                });
                this.observe('updateCallback').subscribe(async () => {
                    await Products.service.updateAsync(this.state.product);
                    messagesAction.next('showMessage', {
                        text: '製品を更新しました。',
                        level: 'info'
                    });
                    this.next('navigationDetail');
                });
                this.observe('clickReset').subscribe(async () => {
                    let product =
                        this.mode === 'create'
                            ? {
                                  name: '',
                                  price: null,
                                  productId: null,
                                  status: '',
                                  productVersions: [this.createNewVersion()]
                              }
                            : await this.getAsync();
                    if (product) {
                        this.setState({
                            product,
                            preProduct: JSON.stringify(product)
                        });
                    } else {
                        messagesAction.next('showMessage', {
                            text: '製品が存在しません。',
                            level: 'error'
                        });
                        this.next('navigationIndex');
                    }
                });

                this.observe('navigationIndex').subscribe(() => {
                    let navigate = () => {
                        productsIndexAction.next('search');
                        this.next('navigation', Url.productsIndex);
                    };
                    let text = this.checkChanged();
                    if (!text) {
                        navigate();
                        return;
                    }
                    dialogAction.next('showYesNo', {
                        title: '製品情報',
                        text,
                        callBack: yes => {
                            if (yes) {
                                navigate();
                            }
                        }
                    });
                });

                this.observe('navigationUpdate').subscribe(() => {
                    this.next('clickReset');
                    this.next('navigation', Url.productsUpdate(this.id));
                });
                this.observe('navigationDetail').subscribe(() => {
                    this.next('clickReset');
                    this.next('navigation', Url.productsDetail(this.id));
                });
                this.observe('navigation').subscribe(url => {
                    this.props.history.push(url);
                });
            }
            checkChanged = () => {
                if (
                    this.state.preProduct &&
                    JSON.stringify(this.state.product) !== this.state.preProduct
                ) {
                    return '変更中の情報は破棄されます。移動しますか？';
                }
            };
            getAsync = async () => {
                let p = await Products.service.getAsync(this.id);
                if (!p) {
                    return null;
                }
                if (p.productVersions) {
                    p.productVersions = p.productVersions.map(x => {
                        return Object.assign({ isSelected: false }, x);
                    });
                } else {
                    p.productVersions = [];
                }
                return p as Product<Version>;
            };
            createNewVersion = (): Version => ({
                isSelected: false,
                date: '',
                version: '',
                notes: '',
                productId: null,
                productVersionId: null
            });
            render() {
                return (
                    <Page title={this.title} loading={!this.state.product}>
                        {this.getElement()}
                    </Page>
                );
            }
            getElement = () => {
                if (!this.state.product) {
                    return '';
                }
                return (
                    <AppGrid container>
                        <AppGrid item xs={12} sm={6} lg={4}>
                            <AppTextField
                                label="製品名"
                                value={this.state.product.name}
                                disabled={this.isReadOnly}
                                onChange={e =>
                                    this.next('changeProduct', {
                                        value: e.target.value,
                                        name: 'name'
                                    })
                                }
                            />
                        </AppGrid>
                        <AppGrid item xs={12} sm={6} lg={4}>
                            <AppTextField
                                type="number"
                                label="価格"
                                value={
                                    this.state.product.price
                                        ? this.state.product.price
                                        : ''
                                }
                                disabled={this.isReadOnly}
                                onChange={e =>
                                    this.next('changeProduct', {
                                        value: e.target.value,
                                        name: 'price'
                                    })
                                }
                            />
                        </AppGrid>
                        <AppGrid item xs={12} sm={6} lg={4}>
                            <RadioFormGroup
                                title="状態"
                                value={this.state.product.status}
                                onChange={(e, v) =>
                                    this.next('changeProduct', {
                                        value: v,
                                        name: 'status'
                                    })
                                }
                                disabled={this.isReadOnly}
                                items={[
                                    { label: '発売中', value: '' },
                                    { label: '製造終了', value: '1' }
                                ]}
                            />
                        </AppGrid>
                        <AppGrid item xs={12}>
                            <FieldSet title="製品バージョン">
                                {this.getVersionElement()}
                            </FieldSet>
                        </AppGrid>
                        <AppGrid
                            item
                            xs={12}
                            className={this.props.classes.action}
                        >
                            <Adjuster>
                                <AppButton
                                    variant="raised"
                                    onClick={() => this.next('navigationIndex')}
                                >
                                    戻る
                                </AppButton>
                            </Adjuster>
                            {(() => {
                                if (!this.isReadOnly) {
                                    return (
                                        <Adjuster horizontal="right">
                                            <AppButton
                                                variant="raised"
                                                color="primary"
                                                onClick={() =>
                                                    this.next('clickExecute')
                                                }
                                            >
                                                {this.executeButtonName}
                                            </AppButton>
                                            <AppButton
                                                variant="raised"
                                                color="secondary"
                                                onClick={() =>
                                                    this.next('clickReset')
                                                }
                                            >
                                                リセット
                                            </AppButton>
                                        </Adjuster>
                                    );
                                }
                                return (
                                    <Adjuster horizontal="right">
                                        <AppButton
                                            variant="raised"
                                            color="primary"
                                            onClick={() =>
                                                this.next('navigationUpdate')
                                            }
                                        >
                                            編集
                                        </AppButton>
                                    </Adjuster>
                                );
                            })()}
                        </AppGrid>
                    </AppGrid>
                );
            };
            getVersionElement = () => {
                return (
                    <TableContainer
                        columns={this.state.columns}
                        actionElement={
                            this.isReadOnly
                                ? null
                                : this.getVersionActionElement()
                        }
                        headElement={this.getVersionHeadElement()}
                    >
                        {this.getVersionBodyElement()}
                    </TableContainer>
                );
            };
            getVersionActionElement = () => {
                return (
                    <div className={this.props.classes['table-action']}>
                        <AppButton
                            variant="raised"
                            size="small"
                            color="primary"
                            onClick={() => this.next('clickAdd')}
                        >
                            <AddIcon />
                        </AppButton>
                        <AppButton
                            variant="raised"
                            size="small"
                            color="secondary"
                            onClick={() => this.next('clickRemove')}
                        >
                            <RemoveIcon />
                        </AppButton>
                    </div>
                );
            };
            getVersionHead = (
                index: number,
                name: keyof ProductVersion,
                text: string,
                props?: Partial<HeadCellProps>
            ) => (
                <HeadCell
                    {...props}
                    onSizeChange={width =>
                        this.next('sizeChange', { index, width })
                    }
                    name={name}
                >
                    {text}
                </HeadCell>
            );
            getVersionHeadElement = () => (
                <AppTableRow>
                    <CheckedCell
                        disabled={this.isReadOnly}
                        hidden={!this.state.product.productVersions.length}
                        checked={this.state.product.productVersions.every(
                            x => x.isSelected
                        )}
                        onChange={e => this.next('selectAll', e)}
                    />
                    {this.getVersionHead(1, 'version', 'バージョン')}
                    {this.getVersionHead(2, 'date', 'リリース日')}
                    {this.getVersionHead(3, 'notes', '内容')}
                </AppTableRow>
            );
            getVersionBodyElement = () =>
                this.state.product.productVersions.map((item, index) => {
                    return (
                        <AppTableRow key={index} selected={item.isSelected}>
                            <CheckedCell
                                checked={item.isSelected}
                                disabled={this.isReadOnly}
                                onChange={e =>
                                    this.next('selectRow', {
                                        selected: !item.isSelected,
                                        index
                                    })
                                }
                            />
                            <Cell>
                                <AppTextField
                                    value={item.version}
                                    disabled={this.isReadOnly}
                                    onChange={e =>
                                        this.next('changeVersion', {
                                            name: 'version',
                                            index,
                                            value: e.target.value
                                        })
                                    }
                                />
                            </Cell>
                            <Cell>
                                <AppTextField
                                    type="date"
                                    value={item.date}
                                    disabled={this.isReadOnly}
                                    onChange={e =>
                                        this.next('changeVersion', {
                                            name: 'date',
                                            index,
                                            value: e.target.value
                                        })
                                    }
                                />
                            </Cell>
                            <Cell>
                                <AppTextField
                                    value={item.notes}
                                    disabled={this.isReadOnly}
                                    onChange={e =>
                                        this.next('changeVersion', {
                                            name: 'notes',
                                            index,
                                            value: e.target.value
                                        })
                                    }
                                />
                            </Cell>
                        </AppTableRow>
                    );
                });
            get id() {
                return Number(this.routeParams.id);
            }
            get isReadOnly() {
                return this.mode === 'detail';
            }
            get routeParams() {
                return this.props.match.params;
            }
            get mode() {
                return this.routeParams.mode;
            }
            get title() {
                let mode = '';
                switch (this.mode) {
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
            get executeButtonName() {
                if (this.mode === 'create') {
                    return '登録';
                }
                return '更新';
            }
        }
    );
}
export const ProductsEdit = InnerScope.component;
