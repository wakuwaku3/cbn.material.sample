import * as React from 'react';
import { themeAction } from '../../actions/shared/theme-action';
import { ColGroupProps, ColGroup } from './col-group';
import { Subscription } from 'rxjs';
import { browserAction } from '../../actions/shared/browser-action';
import { Adjuster } from '../layout/adjuster';
import { Pager } from './pager';
import { TableHead, TableBody, TableFooter, Table, Theme } from 'material-ui';
import { Classes } from '../../../lib/models/types';
import { Pagination } from '../../../lib/models/pagination';
import { decorate, mergeClasses } from '../../../lib/shared/style-helper';
import { StyledEventComponentBase } from '../../../lib/bases/event-component-base';

namespace InnerScope {
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
    const style = (theme: Theme): Style => ({
        root: {},
        'action-container': {
            display: 'flex',
            padding: [0, 0, 8],
            'overflow-x': 'auto',
            [theme.breakpoints.down('sm')]: {
                display: 'block'
            }
        },
        'button-container': {
            display: 'flex',
            'align-items': 'center',
            '& button': { 'margin-right': '4px' },
            [theme.breakpoints.down('sm')]: {
                'overflow-x': 'auto'
            }
        },
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
        table: {
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
        },
        'head-table': {
            '& td,th': {
                background: theme.palette.primary[theme.palette.type],
                color: theme.palette.primary.contrastText
            }
        },
        'body-table': {},
        'foot-table': {
            '& td,th': {
                background: theme.palette.primary[theme.palette.type],
                color: theme.palette.primary.contrastText
            }
        }
    });
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
    interface Event {
        handleResize: void;
        handleScroll: React.UIEvent<HTMLDivElement>;
    }
    export const component = decorate(style)<Props & ColGroupProps>(
        class extends StyledEventComponentBase<
            Event,
            Style,
            Props & ColGroupProps,
            State
        > {
            resizeSubscription: Subscription;
            tableContainerHead: HTMLDivElement;
            tableContainerBody: HTMLDivElement;
            tableContainerFoot: HTMLDivElement;
            get classes() {
                return mergeClasses<Style>(this.props.classes, {
                    root: this.props.className
                });
            }
            get isFix() {
                return this.props.height && this.props.fixHeader;
            }
            constructor(props) {
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
                            this.next('handleResize');
                        });
                    this.next('handleResize');
                }
            }
            componentWillUnmount() {
                if (this.isFix) this.resizeSubscription.unsubscribe();
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
            protected setupObservable() {
                this.observe('handleResize').subscribe(() => {
                    let adjustWidth = this.tableContainerBody.clientWidth;
                    this.setState({ adjustWidth });
                });
                this.observe('handleScroll').subscribe(e => {
                    this.setState({
                        scrollLeft: e.currentTarget.scrollLeft
                    });
                });
            }
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
                                <Adjuster horizontal="right" vertical="center">
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
            getFoot = () => <TableFooter>{this.props.footElement}</TableFooter>;
            getFixContent = () => (
                <div className={this.classes.root}>
                    {this.getAction()}
                    <div
                        className={`${this.classes['table-container']} ${
                            this.classes['table-container-head']
                        }`}
                        ref={e => (this.tableContainerHead = e)}
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
                        onScroll={e => this.next('handleScroll', e)}
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
export type TableContainerProps = InnerScope.Props;
export const TableContainer = InnerScope.component;
