import * as React from 'react';
import { decorate, decorateWithStore } from '../../helper/app-style-helper';
import { AppButton, AppGrid, AppTextField } from '../../components/material-ui/wrapper';
import { AddIcon, RemoveIcon, RefreshIcon } from '../../components/material-ui/icon-wrapper';
import { productsIndexAction } from '../../actions/products/index-action';
import { TableRow } from 'material-ui';
import { CheckedCell } from '../../components/table-control/checked-cell';
import { HeadCell } from '../../components/table-control/head-cell';
import { Cell } from '../../components/table-control/cell';
import { TableContainer } from '../../components/table-control/table-container';
import { Adjuster } from '../../components/layout/app-container';
import { Page } from '../../components/layout/app-page';
import { FieldSet } from '../../components/form-control/app-fieldset';

namespace InnerScope {
    const SearchResult = decorate({
        action: {
            display: 'flex'
        }
    })(
        sheet =>
            class extends React.Component<{}, { columns: number[] }> {
                constructor(props) {
                    super(props);
                    this.state = { columns: [50, 100, 300, 300, 300, 300] };
                }
                handleSizeChange = (index: number) => (width: number) => {
                    let columns = this.state.columns;
                    columns[index] = width;
                    this.setState({ columns });
                };
                getActionElement = () => (
                    <div className={sheet.classes.action}>
                        <AppButton variant="raised" size="small" color="primary">
                            <AddIcon />
                        </AppButton>
                        <AppButton variant="raised" size="small" color="secondary">
                            <RemoveIcon />
                        </AppButton>
                        <AppButton variant="raised" size="small" onClick={e => productsIndexAction.emit('search')}>
                            <RefreshIcon />
                        </AppButton>
                    </div>
                );
                getHeadElement = () => (
                    <TableRow>
                        <CheckedCell
                            checked={productsIndexAction.model.items.every(x => x.isSelected)}
                            onChange={e => productsIndexAction.emit('selectAll', e.target.checked)}
                        />
                        <HeadCell onSizeChange={this.handleSizeChange(1)}>ID</HeadCell>
                        <HeadCell
                            sorting={productsIndexAction.model.condition.sorting}
                            name="name"
                            onSort={(e, s) => {
                                productsIndexAction.emit('search', {
                                    sorting: s
                                });
                            }}
                        >
                            製品名
                        </HeadCell>
                        <HeadCell
                            sorting={productsIndexAction.model.condition.sorting}
                            name="status"
                            onSort={(e, s) => {
                                productsIndexAction.emit('search', {
                                    sorting: s
                                });
                            }}
                        >
                            状態
                        </HeadCell>
                        <HeadCell cellProps={{ numeric: true }}>価格</HeadCell>
                        <HeadCell>発売日</HeadCell>
                    </TableRow>
                );
                getBodyElement = () =>
                    productsIndexAction.model.items.map(n => {
                        return (
                            <TableRow
                                key={n.id}
                                selected={n.isSelected}
                                onClick={e => {
                                    productsIndexAction.emit('select', {
                                        value: !n.isSelected,
                                        id: n.id
                                    });
                                }}
                            >
                                <CheckedCell
                                    checked={n.isSelected}
                                    onChange={e =>
                                        productsIndexAction.emit('select', {
                                            value: e.target.checked,
                                            id: n.id
                                        })
                                    }
                                />
                                <Cell>{n.id}</Cell>
                                <Cell>{n.name}</Cell>
                                <Cell>{n.status}</Cell>
                                <Cell numeric>{n.price}</Cell>
                                <Cell>{n.releaseDate}</Cell>
                            </TableRow>
                        );
                    });
                getFootElement = () => (
                    <TableRow>
                        <Cell />
                        <Cell>ID</Cell>
                        <Cell>製品名</Cell>
                        <Cell>状態</Cell>
                        <Cell numeric>価格</Cell>
                        <Cell>発売日</Cell>
                    </TableRow>
                );
                render() {
                    return (
                        <TableContainer
                            columns={this.state.columns}
                            pagination={productsIndexAction.model.condition.pagination}
                            onPaging={e => {
                                productsIndexAction.emit('search', {
                                    pagination: e
                                });
                            }}
                            actionElement={this.getActionElement()}
                            headElement={this.getHeadElement()}
                            footElement={this.getFootElement()}
                        >
                            {this.getBodyElement()}
                        </TableContainer>
                    );
                }
            }
    );

    const Condition = () => (
        <AppGrid container>
            <AppGrid item xs={12} sm={6} md={4}>
                <AppTextField
                    label="製品名"
                    value={productsIndexAction.model.condition.name}
                    onChange={e => {
                        productsIndexAction.emit('search', {
                            name: e.target.value
                        });
                    }}
                />
            </AppGrid>
            <AppGrid item xs={12} sm={6} md={4}>
                <AppTextField
                    label="状態"
                    value={productsIndexAction.model.condition.status}
                    onChange={e => {
                        productsIndexAction.emit('search', {
                            status: e.target.value
                        });
                    }}
                />
            </AppGrid>
            <AppGrid item xs={12}>
                <Adjuster horizontal="right">
                    <AppButton variant="raised" color="secondary" onClick={() => productsIndexAction.emit('reset')}>
                        リセット
                    </AppButton>
                </Adjuster>
            </AppGrid>
        </AppGrid>
    );

    const styles = {};
    export const component = decorateWithStore(styles, productsIndexAction.key)(sheet => props => (
        <AppGrid container>
            <AppGrid item xs={12}>
                <Page title="製品一覧">
                    <FieldSet title="検索条件" defaultExpanded={false}>
                        <Condition />
                    </FieldSet>
                    <FieldSet title="検索結果">
                        <SearchResult />
                    </FieldSet>
                </Page>
            </AppGrid>
        </AppGrid>
    ));
}
export const ProductsIndex = InnerScope.component;
