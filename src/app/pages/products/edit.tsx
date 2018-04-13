import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { decorate } from '../../helper/app-style-helper';
import { WithStyles, TableRow } from 'material-ui';
import { Cbn } from '../../../lib/shared/cbn';
import { Product, ProductVersion } from '../../models/actions/products';
import { Page } from '../../components/layout/page';
import {
    AppGrid,
    AppButton,
    AppTextField,
    AppSelect,
    AppInputLabel,
    AppInput,
    AppMenuItem,
    AppFormControl
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
import { Products } from '../../services/products-service';
import { messagesAction } from '../../actions/shared/messages-action';
import { Url } from '../../masters/app-router';
import { productsIndexAction } from '../../actions/products/index-action';

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
        id?: number;
    }
    interface Props {}
    interface Event {
        initialize: RouteParams;
    }
    interface State {
        columns: number[];
        product?: Product<Version>;
    }
    interface Version extends ProductVersion, Selectable {}

    export const component = decorate(style)(
        sheet =>
            class extends React.Component<
                Props & RouteComponentProps<RouteParams>,
                State
            > {
                constructor(props) {
                    super(props);
                    this.state = { columns: [50, 200, 200, 200] };
                }
                componentWillMount() {
                    this.handleClickReset();
                }
                handleSizeChange = (index: number) => (width: number) => {
                    let columns = this.state.columns;
                    columns[index] = width;
                    this.setState({ columns });
                };
                handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
                    this.state.product.productVersions.forEach(
                        x => (x.isSelected = e.target.checked)
                    );
                    this.setState({ product: this.state.product });
                };
                handleSelectRow = (v: boolean, i: number) => () => {
                    this.state.product.productVersions[i].isSelected = v;
                    this.setState({ product: this.state.product });
                };
                handleChangeProduct = (name: keyof Product<Version>) => (
                    e: React.ChangeEvent<HTMLInputElement>
                ) => {
                    this.state.product[name] = e.target.value;
                    this.setState({ product: this.state.product });
                };
                handleChangeVersion = (name: keyof Version, i: number) => (
                    e: React.ChangeEvent<HTMLInputElement>
                ) => {
                    this.state.product.productVersions[i][name] =
                        e.target.value;
                    this.setState({ product: this.state.product });
                };
                handleClickAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
                    this.state.product.productVersions.push(
                        this.createNewVersion()
                    );
                    this.setState({ product: this.state.product });
                };
                handleClickExecute = async () => {
                    switch (this.mode) {
                        case 'create':
                            await Products.service.createAsync(
                                this.state.product
                            );
                            messagesAction.emit('showMessage', {
                                text: '製品を登録しました。',
                                level: 'info'
                            });
                            break;
                    }
                    this.handleClickReturn();
                };
                handleClickReset = () => {
                    if (this.mode === 'create') {
                        this.setState({
                            product: {
                                name: '',
                                price: null,
                                productId: null,
                                status: '',
                                productVersions: [this.createNewVersion()]
                            }
                        });
                    }
                };
                handleClickReturn = () => {
                    productsIndexAction.emit('search');
                    this.props.history.push(Url.productsIndex);
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
                    return this.getElement();
                }
                getElement = () => {
                    return (
                        <Page title={this.title} loading={!this.state.product}>
                            <AppGrid container>
                                <AppGrid item xs={12} sm={6} lg={4}>
                                    <AppTextField
                                        label="製品名"
                                        value={this.state.product.name}
                                        onChange={this.handleChangeProduct(
                                            'name'
                                        )}
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
                                        onChange={this.handleChangeProduct(
                                            'price'
                                        )}
                                    />
                                </AppGrid>
                                <AppGrid item xs={12} sm={6} lg={4}>
                                    <RadioFormGroup
                                        title="状態"
                                        value={this.state.product.status}
                                        onChange={this.handleChangeProduct(
                                            'status'
                                        )}
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
                                    className={sheet.classes.action}
                                >
                                    <Adjuster>
                                        <AppButton
                                            variant="raised"
                                            onClick={this.handleClickReturn}
                                        >
                                            戻る
                                        </AppButton>
                                    </Adjuster>
                                    <Adjuster horizontal="right">
                                        <AppButton
                                            variant="raised"
                                            color="primary"
                                            onClick={this.handleClickExecute}
                                        >
                                            {this.executeButtonName}
                                        </AppButton>
                                        <AppButton
                                            variant="raised"
                                            color="secondary"
                                            onClick={this.handleClickReset}
                                        >
                                            リセット
                                        </AppButton>
                                    </Adjuster>
                                </AppGrid>
                            </AppGrid>
                        </Page>
                    );
                };
                getVersionElement = () => {
                    return (
                        <TableContainer
                            columns={this.state.columns}
                            actionElement={this.getVersionActionElement()}
                            headElement={this.getVersionHeadElement()}
                        >
                            {this.getVersionBodyElement()}
                        </TableContainer>
                    );
                };
                getVersionActionElement = () => {
                    return (
                        <div className={sheet.classes['table-action']}>
                            <AppButton
                                variant="raised"
                                size="small"
                                color="primary"
                                onClick={() => {}}
                            >
                                <AddIcon />
                            </AppButton>
                            <AppButton
                                variant="raised"
                                size="small"
                                color="secondary"
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
                        onSizeChange={this.handleSizeChange(index)}
                        name={name}
                    >
                        {text}
                    </HeadCell>
                );
                getVersionHeadElement = () => (
                    <TableRow>
                        <CheckedCell
                            hidden={!this.state.product.productVersions.length}
                            checked={this.state.product.productVersions.every(
                                x => x.isSelected
                            )}
                            onChange={this.handleSelectAll}
                        />
                        {this.getVersionHead(1, 'version', 'バージョン')}
                        {this.getVersionHead(2, 'date', 'リリース日')}
                        {this.getVersionHead(3, 'notes', '内容')}
                    </TableRow>
                );
                getVersionBodyElement = () =>
                    this.state.product.productVersions.map((item, i) => {
                        return (
                            <TableRow key={i} selected={item.isSelected}>
                                <CheckedCell
                                    checked={item.isSelected}
                                    onChange={this.handleSelectRow(
                                        !item.isSelected,
                                        i
                                    )}
                                />
                                <Cell>
                                    <AppTextField
                                        value={item.version}
                                        onChange={this.handleChangeVersion(
                                            'version',
                                            i
                                        )}
                                    />
                                </Cell>
                                <Cell>
                                    <AppTextField
                                        type="date"
                                        value={item.date}
                                        onChange={this.handleChangeVersion(
                                            'date',
                                            i
                                        )}
                                    />
                                </Cell>
                                <Cell>
                                    <AppTextField
                                        value={item.notes}
                                        onChange={this.handleChangeVersion(
                                            'notes',
                                            i
                                        )}
                                    />
                                </Cell>
                            </TableRow>
                        );
                    });
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
