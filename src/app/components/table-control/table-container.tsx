import * as React from 'react';
import { themeAction } from '../../actions/shared/theme-action';
import { ColGroupProps, ColGroup } from './col-group';
import { decorate } from '../../helper/app-style-helper';
import { Subscription } from 'rxjs';
import { Cbn } from '../../../lib/shared/cbn';
import { browserAction } from '../../actions/shared/browser-action';
import { Adjuster } from '../layout/adjuster';
import { Pager } from './pager';
import { TableHead, TableBody, TableFooter, Table } from 'material-ui';
import { Classes } from '../../../lib/models/types';
import { Pagination } from '../../../lib/models/pagination';

namespace InnerScope2 {
    export interface Style {
        root;
        'action-container';
        'button-container';
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
        'action-container': themeAction.getThemeObservable().map(theme => ({
            display: 'flex',
            padding: [0, 0, 8],
            'overflow-x': 'auto',
            [theme.breakpoints.down('sm')]: {
                display: 'block'
            }
        })),
        'button-container': themeAction.getThemeObservable().map(theme => ({
            display: 'flex',
            'align-items': 'center',
            '& button': { 'margin-right': '4px' },
            [theme.breakpoints.down('sm')]: {
                'overflow-x': 'auto'
            }
        })),
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
        table: themeAction.getThemeObservable().map(theme => ({
            width: 0,
            'table-layout': 'fixed',
            '& th': {
                background: theme.palette.primary[theme.palette.type],
                color: theme.palette.primary.contrastText
            },
            '& tfoot td': {
                background: theme.palette.primary[theme.palette.type],
                color: theme.palette.primary.contrastText
            },
            '& td,th': {
                'border-color': theme.palette.grey['300'],
                'border-style': 'solid',
                'border-width': '1px'
            }
        })),
        'head-table': themeAction.getThemeObservable().map(theme => ({
            '& td,th': {
                background: theme.palette.primary[theme.palette.type],
                color: theme.palette.primary.contrastText
            }
        })),
        'body-table': {},
        'foot-table': themeAction.getThemeObservable().map(theme => ({
            '& td,th': {
                background: theme.palette.primary[theme.palette.type],
                color: theme.palette.primary.contrastText
            }
        }))
    };
    export interface Props {
        actionElement?: JSX.Element;
        headElement?: JSX.Element;
        footElement?: JSX.Element;
        classes?: Classes<Style>;
        className?: string;
        height?: string | number;
        fixHeader?: boolean;
        pagination?: Pagination;
        onPaging?: (pagination: Pagination) => void;
    }
    export interface State {
        scrollLeft: number;
        adjustWidth: string | number;
    }
    type props = Props & ColGroupProps;
    export const component = decorate(style)<props>(
        sheet =>
            class extends React.Component<props, State> {
                resizeSubscription: Subscription;
                tableContainerHead: HTMLDivElement;
                tableContainerBody: HTMLDivElement;
                tableContainerFoot: HTMLDivElement;
                get classes() {
                    return Cbn.mergeClasses<Style>(
                        sheet.classes,
                        this.props.classes,
                        {
                            root: this.props.className
                        }
                    );
                }
                get isFix() {
                    return this.props.height && this.props.fixHeader;
                }
                constructor(props: props) {
                    super(props);
                    this.state = {
                        adjustWidth: 'inherit',
                        scrollLeft: 0
                    };
                }
                componentDidMount() {
                    if (this.isFix) {
                        this.resizeSubscription = browserAction
                            .observe('resize')
                            .subscribe(() => {
                                this.handleResize();
                            });
                        this.handleResize();
                    }
                }
                componentWillUnmount() {
                    if (this.isFix) this.resizeSubscription.unsubscribe();
                }
                handleResize() {
                    let adjustWidth = this.tableContainerBody.clientWidth;
                    this.setState({ adjustWidth });
                }
                componentDidUpdate() {
                    if (this.isFix) {
                        this.setScrollX(
                            this.tableContainerHead,
                            this.state.scrollLeft
                        );
                        this.setScrollX(
                            this.tableContainerFoot,
                            this.state.scrollLeft
                        );
                    }
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
                getAction = () => (
                    <div className={this.classes['action-container']}>
                        <Adjuster
                            horizontal="left"
                            vertical="center"
                            className={this.classes['button-container']}
                        >
                            {(() => {
                                if (this.props.actionElement) {
                                    return this.props.actionElement;
                                }
                            })()}
                        </Adjuster>
                        {(() => {
                            if (this.props.pagination) {
                                return (
                                    <Adjuster
                                        horizontal="right"
                                        vertical="center"
                                    >
                                        <Pager
                                            pagination={this.props.pagination}
                                            onChange={e => {
                                                if (this.props.onPaging)
                                                    this.props.onPaging(e);
                                            }}
                                        />
                                    </Adjuster>
                                );
                            }
                        })()}
                    </div>
                );
                getColGroup = () => <ColGroup columns={this.props.columns} />;
                getHead = () => <TableHead>{this.props.headElement}</TableHead>;
                getBody = () => <TableBody>{this.props.children}</TableBody>;
                getFoot = () => (
                    <TableFooter>{this.props.footElement}</TableFooter>
                );
                getFixContent = () => (
                    <div className={this.classes.root}>
                        {this.getAction()}
                        <div
                            className={`${this.classes['table-container']} ${
                                this.classes['table-container-head']
                            }`}
                            ref={e => (this.tableContainerHead = e)}
                            onScroll={this.handleScroll}
                            style={{ width: this.state.adjustWidth }}
                        >
                            {(() => {
                                if (this.props.headElement) {
                                    return (
                                        <Table
                                            className={`${this.classes.table} ${
                                                this.classes['head-table']
                                            }`}
                                        >
                                            {this.getColGroup()}
                                            {this.getHead()}
                                        </Table>
                                    );
                                }
                            })()}
                        </div>
                        <div
                            className={`${this.classes['table-container']} ${
                                this.classes['table-container-body']
                            }`}
                            ref={e => (this.tableContainerBody = e)}
                            onScroll={this.handleScroll}
                            style={{
                                height: this.props.height
                            }}
                        >
                            <Table
                                className={`${this.classes.table} ${
                                    this.classes['body-table']
                                }`}
                            >
                                {this.getColGroup()}
                                {this.getBody()}
                            </Table>
                        </div>
                        <div
                            className={`${this.classes['table-container']} ${
                                this.classes['table-container-foot']
                            }`}
                            ref={e => (this.tableContainerFoot = e)}
                            onScroll={this.handleScroll}
                            style={{
                                width: this.state.adjustWidth
                            }}
                        >
                            {(() => {
                                if (this.props.footElement) {
                                    return (
                                        <Table
                                            className={`${this.classes.table} ${
                                                this.classes['foot-table']
                                            }`}
                                        >
                                            {this.getColGroup()}
                                            {this.getFoot()}
                                        </Table>
                                    );
                                }
                            })()}
                        </div>
                    </div>
                );
                getFlowContent = () => (
                    <div className={this.classes.root}>
                        {this.getAction()}
                        <div
                            className={`${this.classes['table-container']} ${
                                this.classes['table-container-body']
                            }`}
                        >
                            <Table
                                className={`${this.classes.table} ${
                                    this.classes['body-table']
                                }`}
                            >
                                {this.getColGroup()}
                                {(() => {
                                    if (this.props.headElement) {
                                        return this.getHead();
                                    }
                                })()}
                                {this.getBody()}
                                {(() => {
                                    if (this.props.footElement) {
                                        return this.getFoot();
                                    }
                                })()}
                            </Table>
                        </div>
                    </div>
                );
                render() {
                    if (this.isFix) {
                        return this.getFixContent();
                    }
                    return this.getFlowContent();
                }
            }
    );
}
export type TableContainerProps = InnerScope2.Props;
export const TableContainer = InnerScope2.component;
