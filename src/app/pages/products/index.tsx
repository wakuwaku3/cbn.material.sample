import * as React from 'react';
import { decorateWithStore, decorate, decorateWithProps } from '../../helper/app-style-helper';
import { productsIndexAction } from '../../actions/products/index-action';
import { AppForm } from '../../components/app-form';
import { AppFieldSet } from '../../components/app-fieldset';
import { AppGrid, AppTextField, AppButton, AppTypography, AppTooltip } from '../../components/material-ui/wrapper';
import { Cbn } from '../../../lib/shared/cbn';
import { AppContainer } from '../../components/app-container';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
    WithStyles,
    Theme,
    TableSortLabel,
    TablePagination
} from 'material-ui';
import { Scroll, DivProps, SortDirection, Classes } from '../../models/shared/types';
import { themeAction } from '../../actions/shared/theme-action';
import { browserAction } from '../../actions/shared/browser-action';
import { TableCellProps } from 'material-ui/Table';
import { Subscription } from 'rxjs';
import { Sorting } from '../../models/shared/sorting';
import { DividerLine } from '../../components/divider-line';
import { AddIcon, RemoveIcon, RefreshIcon } from '../../components/material-ui/icon-wrapper';
import { Pagination } from '../../models/shared/pagination';

namespace InnerScope6 {
    export interface Style {}
    const style: Style = {};
    export interface Props {
        pagination: Pagination;
        onChange: (pagination: Pagination) => void;
        rowsPerPage: number[];
    }
    interface State {}
    export const component = decorate(style)<Props>(
        sheet =>
            class extends React.Component<Props, State> {
                render() {
                    return <div />;
                }
            }
    );
}
export type AppPaginationProps = InnerScope6.Props;
export const AppPagination = InnerScope6.component;
namespace InnerScope5 {
    export interface Props {
        cellProps?: AppTableCellProps;
        sorting?: Sorting;
        name?: string;
        onSort?: (e: React.MouseEvent<HTMLElement>, sorting: Sorting) => void;
        onSizeChange?: (width: number) => void;
        classes?: Classes<Style>;
        minWidth?: number;
    }
    interface State {
        isDrag: boolean;
        x: number;
        w: number;
    }
    export interface Style {
        root;
        dummy;
    }
    const style: Style = {
        root: {},
        dummy: {
            position: 'absolute',
            width: '100%',
            height: 1,
            top: 0,
            left: 0
        }
    };
    export const component = decorate(style)<Props>(
        sheet =>
            class extends React.Component<Props, State> {
                element: HTMLDivElement;
                constructor(props: Props) {
                    super(props);
                    this.state = { isDrag: false, x: 0, w: 0 };
                }
                get isActive() {
                    return this.props.sorting && this.props.sorting.name === this.props.name;
                }
                componentDidMount() {
                    document.body.addEventListener('mousemove', this.handleMove);
                    document.body.addEventListener('mouseleave', this.handleUp);
                    document.body.addEventListener('mouseup', this.handleUp);
                }
                componentWillUnmount() {
                    document.body.removeEventListener('mousemove', this.handleMove);
                    document.body.removeEventListener('mouseleave', this.handleUp);
                    document.body.removeEventListener('mouseup', this.handleUp);
                }
                handleDown = (e: React.MouseEvent<HTMLDivElement>) => {
                    let rect = this.element.getBoundingClientRect();
                    this.setState({
                        x: e.nativeEvent.pageX,
                        w: rect.width,
                        isDrag: true
                    });
                };
                handleMove = e => {
                    if (this.state.isDrag) {
                        e.preventDefault();
                        let p = e.pageX - this.state.x;
                        let len = this.state.w + p;
                        if (len >= this.props.minWidth) {
                            this.props.onSizeChange(len);
                        }
                    }
                };
                handleUp = () => {
                    this.setState({ isDrag: false });
                };
                getLine = () => {
                    if (this.props.onSizeChange) {
                        return [
                            <div key={0} className={sheet.classes.dummy} ref={e => (this.element = e)} />,
                            <DividerLine key={1} positioning="Right" onMouseDown={e => this.handleDown(e)} />
                        ];
                    }
                };
                getContent = () => {
                    if (this.props.sorting && this.props.onSort) {
                        return (
                            <TableSortLabel
                                active={this.isActive}
                                direction={this.props.sorting.direction}
                                onClick={e => {
                                    let s: Sorting = { name: this.props.name, direction: 'asc' };
                                    if (this.isActive && this.props.sorting.direction === 'asc') {
                                        s.direction = 'desc';
                                    }
                                    this.props.onSort(e, s);
                                }}
                            >
                                {this.props.children}
                            </TableSortLabel>
                        );
                    } else {
                        return this.props.children;
                    }
                };
                render() {
                    let classes = Cbn.mergeClasses(this.props.classes, sheet.classes);
                    let cellProps = Object.assign({}, this.props.cellProps, {
                        sortDirection: this.isActive ? this.props.sorting.direction : false
                    });
                    return (
                        <AppTableCell {...cellProps} className={classes.root}>
                            {this.getLine()}
                            {this.getContent()}
                        </AppTableCell>
                    );
                }
            }
    );
    component.defaultProps = {
        minWidth: 25
    };
}
export type AppHeadTableCellProps = InnerScope5.Props;
export const AppHeadTableCell = InnerScope5.component;

namespace InnerScope4 {
    interface Style {
        root;
    }
    const style: Style = {
        root: {
            'text-overflow': 'ellipsis',
            overflow: 'hidden',
            'white-space': 'nowrap',
            position: 'relative'
        }
    };
    export interface Props extends TableCellProps {}
    export const component = decorate(style)<Props>(sheet => props => {
        let classes = Cbn.mergeClasses(props.classes, sheet.classes);
        let mergedprops = Object.assign({}, props, { classes });
        return <TableCell {...mergedprops}>{props.children}</TableCell>;
    });
}
export type AppTableCellProps = InnerScope4.Props;
export const AppTableCell = InnerScope4.component;

namespace InnerScope3 {
    export interface Props {
        columns?: number[];
    }
    export const component = (props: Props) => (
        <colgroup>{props.columns.map((c, i) => <col key={i} width={c} />)}</colgroup>
    );
}
export type AppColGroupProps = InnerScope3.Props;
export const AppColGroup = InnerScope3.component;
namespace InnerScope2 {
    export interface Style {
        root;
        'table-container';
        'table-container-head';
        'table-container-body';
        'table-container-foot';
        table;
        'head-table';
        'body-table';
        'foot-table';
    }
    const style: Style = {
        root: {},
        'table-container': {},
        'table-container-head': {
            overflow: 'hidden'
        },
        'table-container-body': {
            overflow: 'auto'
        },
        'table-container-foot': {
            overflow: 'hidden'
        },
        table: themeAction.getThemeObservable().map((theme: Theme) => ({
            'table-layout': 'fixed',
            '& th': {
                background: theme.palette.primary[theme.palette.type],
                color: theme.palette.primary.contrastText
            },
            '& td,th': {
                'border-color': theme.palette.grey['300'],
                'border-style': 'solid',
                'border-width': '1px'
            }
        })),
        'head-table': themeAction.getThemeObservable().map((theme: Theme) => ({
            '& td,th': {
                background: theme.palette.primary[theme.palette.type],
                color: theme.palette.primary.contrastText
            }
        })),
        'body-table': {},
        'foot-table': themeAction.getThemeObservable().map((theme: Theme) => ({
            '& td,th': {
                background: theme.palette.primary[theme.palette.type],
                color: theme.palette.primary.contrastText
            }
        }))
    };
    export interface Props {
        headElement?: JSX.Element;
        footElement?: JSX.Element;
        classes?: Classes<Style>;
        className?: string;
        height?: string | number;
    }
    export interface State {
        scrollLeft: number;
        adjustWidth: string | number;
    }
    type props = Props & AppColGroupProps;
    export const component = decorate(style)<props>(
        sheet =>
            class extends React.Component<props, State> {
                resizeSubscription: Subscription;
                tableContainerHead: HTMLDivElement;
                tableContainerBody: HTMLDivElement;
                tableContainerFoot: HTMLDivElement;
                constructor(props: props) {
                    super(props);
                    this.state = {
                        adjustWidth: 'inherit',
                        scrollLeft: 0
                    };
                }
                componentDidMount() {
                    this.resizeSubscription = browserAction.observe('resize').subscribe(() => {
                        this.handleResize();
                    });
                    this.handleResize();
                }
                componentWillUnmount() {
                    this.resizeSubscription.unsubscribe();
                }
                handleResize() {
                    let adjustWidth = this.tableContainerBody.clientWidth;
                    this.setState({ adjustWidth });
                }
                componentDidUpdate() {
                    this.setScrollX(this.tableContainerHead, this.state.scrollLeft);
                    this.setScrollX(this.tableContainerBody, this.state.scrollLeft);
                    this.setScrollX(this.tableContainerFoot, this.state.scrollLeft);
                }

                handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
                    this.setState({
                        scrollLeft: e.currentTarget.scrollLeft
                    });
                };
                setScrollX = (div: HTMLDivElement, scrollX: number) => {
                    if (div.scrollWidth !== scrollX) {
                        div.scrollLeft = scrollX;
                    }
                };
                render() {
                    let classes = Cbn.mergeClasses<Style>(sheet.classes, this.props.classes, {
                        root: this.props.className
                    });
                    return (
                        <div className={classes.root}>
                            <div>
                                <div>
                                    <AppButton variant="raised" size="small" color="primary">
                                        <AddIcon />
                                    </AppButton>
                                    <AppButton variant="raised" size="small" color="secondary">
                                        <RemoveIcon />
                                    </AppButton>
                                    <AppButton variant="raised" size="small">
                                        <RefreshIcon />
                                    </AppButton>
                                </div>
                            </div>
                            <div
                                className={`${classes['table-container']} ${classes['table-container-head']}`}
                                ref={e => (this.tableContainerHead = e)}
                                onScroll={this.handleScroll}
                                style={{ width: this.state.adjustWidth }}
                            >
                                {(() => {
                                    if (this.props.headElement) {
                                        return (
                                            <Table className={`${classes.table} ${classes['head-table']}`}>
                                                <AppColGroup columns={this.props.columns} />
                                                <TableHead>{this.props.headElement}</TableHead>
                                            </Table>
                                        );
                                    }
                                })()}
                            </div>
                            <div
                                className={`${classes['table-container']} ${classes['table-container-body']}`}
                                ref={e => (this.tableContainerBody = e)}
                                onScroll={this.handleScroll}
                                style={{
                                    height: this.props.height
                                }}
                            >
                                <Table className={`${classes.table} ${classes['body-table']}`}>
                                    <AppColGroup columns={this.props.columns} />
                                    <TableBody>{this.props.children}</TableBody>
                                </Table>
                            </div>
                            <div
                                className={`${classes['table-container']} ${classes['table-container-foot']}`}
                                ref={e => (this.tableContainerFoot = e)}
                                onScroll={this.handleScroll}
                                style={{
                                    width: this.state.adjustWidth
                                }}
                            >
                                {(() => {
                                    if (this.props.footElement) {
                                        return (
                                            <Table className={`${classes.table} ${classes['foot-table']}`}>
                                                <AppColGroup columns={this.props.columns} />
                                                <TableFooter>{this.props.footElement}</TableFooter>
                                            </Table>
                                        );
                                    }
                                })()}
                            </div>
                        </div>
                    );
                }
            }
    );
}
export type AppTableProps = InnerScope2.Props;
export const AppTable = InnerScope2.component;
namespace InnerScope {
    class SearchResult extends React.Component<{}, { columns: number[] }> {
        constructor(props) {
            super(props);
            this.state = { columns: [50, 300, 300, 300, 300] };
        }
        handleSizeChange = (index: number) => (width: number) => {
            let columns = this.state.columns;
            columns[index] = width;
            this.setState({ columns });
        };
        render() {
            return (
                <AppTable
                    columns={this.state.columns}
                    headElement={
                        <TableRow>
                            <AppHeadTableCell onSizeChange={this.handleSizeChange(0)}>ID</AppHeadTableCell>
                            <AppHeadTableCell
                                sorting={productsIndexAction.model.condition.sorting}
                                name="name"
                                onSort={(e, s) => {
                                    productsIndexAction.emit('search', {
                                        sorting: s
                                    });
                                }}
                            >
                                製品名
                            </AppHeadTableCell>
                            <AppHeadTableCell
                                sorting={productsIndexAction.model.condition.sorting}
                                name="status"
                                onSort={(e, s) => {
                                    productsIndexAction.emit('search', {
                                        sorting: s
                                    });
                                }}
                            >
                                状態
                            </AppHeadTableCell>
                            <AppHeadTableCell cellProps={{ numeric: true }}>価格</AppHeadTableCell>
                            <AppHeadTableCell>発売日</AppHeadTableCell>
                        </TableRow>
                    }
                    footElement={
                        <TableRow>
                            <AppTableCell>ID</AppTableCell>
                            <AppTableCell>製品名</AppTableCell>
                            <AppTableCell>状態</AppTableCell>
                            <AppTableCell numeric>価格</AppTableCell>
                            <AppTableCell>発売日</AppTableCell>
                        </TableRow>
                    }
                >
                    {productsIndexAction.model.items.map(n => {
                        return (
                            <TableRow key={n.id}>
                                <AppTableCell>
                                    <AppButton variant="raised">{n.id}</AppButton>
                                </AppTableCell>
                                <AppTableCell>{n.name}</AppTableCell>
                                <AppTableCell>{n.status}</AppTableCell>
                                <AppTableCell numeric>{n.price}</AppTableCell>
                                <AppTableCell>{n.releaseDate}</AppTableCell>
                            </TableRow>
                        );
                    })}
                </AppTable>
            );
        }
    }

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
                <AppContainer horizontal="right">
                    <AppButton variant="raised" color="secondary" onClick={() => productsIndexAction.emit('reset')}>
                        リセット
                    </AppButton>
                </AppContainer>
            </AppGrid>
        </AppGrid>
    );

    const styles = {};
    export const component = decorateWithStore(styles, productsIndexAction.key)(sheet => props => (
        <AppGrid container>
            <AppGrid item xs={12}>
                <AppForm title="製品一覧">
                    <AppFieldSet title="検索条件">
                        <Condition />
                    </AppFieldSet>
                    <AppFieldSet title="検索結果">
                        <SearchResult />
                    </AppFieldSet>
                </AppForm>
            </AppGrid>
        </AppGrid>
    ));
}
export const ProductsIndex = InnerScope.component;
