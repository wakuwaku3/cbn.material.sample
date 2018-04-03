import { App } from '../../shared/app';
import * as React from 'react';
import {
    Table,
    TableHeader,
    TableRow,
    TableHeaderColumn,
    TableBody,
    TableRowColumn,
    TableProps,
    TableHeaderProps,
    TableBodyProps,
    TableFooterProps,
    TableFooter,
    TableRowColumnProps,
    TableHeaderColumnProps,
    Paper,
    TextField,
    Card,
    CardHeader,
    CardText,
    CardActions,
    FlatButton,
    RaisedButton,
    FloatingActionButton,
    Slider,
    SliderProps
} from 'material-ui';
import { Cbn } from '../../../lib/shared/cbn';
import { Products } from '../../services/products-service';
import {
    ContentAdd,
    ContentRemove,
    NavigationRefresh,
    ImageEdit
} from 'material-ui/svg-icons';

export namespace ProductsIndex {
    export interface Model {
        condition: Products.GetAsyncRequest;
        items: Products.GetAsyncResponseItem[];
    }
    export interface Event extends Cbn.Event, Cbn.TwoWay.Event {
        initializeCondition: void;
        search: Products.GetAsyncRequest;
    }
    class Action extends Cbn.PageAction<App.Store, 'productsIndex', Event> {
        protected initialize() {
            Cbn.Observable.fromEvent(
                this.emitter,
                'initializeCondition'
            ).subscribe(() => {
                this.model.condition = Products.service.initializeAsync();
                this.emitter.emit('search', this.model.condition);
            });
            Cbn.Observable.fromEvent(this.emitter, 'search').subscribe(
                condition => {
                    let response = Products.service.getAsync(condition);
                    this.model.condition.pager = response.pager;
                    this.model.items = response.items;
                    this.emitter.emit('reflesh');
                }
            );
            Cbn.Observable.fromEvent(this.emitter, 'valueChange').subscribe(
                args => {
                    this.emitter.emit('search', this.model.condition);
                }
            );
            if (!this.model) {
                this.model = { condition: {}, items: [] };
            }
            this.emitter.emit('initializeCondition');
        }
    }
    const action = new Action('productsIndex');
    const styles = {
        condition: {
            marginBottom: 10
        },
        action: {
            display: 'flex'
        },
        'action-left': {
            marginRight: 'auto'
        },
        'action-right': {
            marginLeft: 'auto'
        },
        pager: {
            display: 'flex'
        },
        'pager-slider': {
            display: 'flex',
            alignItems: 'center'
        },
        'pager-slider-label': {
            margin: [0, 10, 0, 20]
        }
    };
    const classes = Cbn.Jss.attachStyles(styles);
    const tableProps: TableProps = {
        height: '400px',
        fixedHeader: true,
        fixedFooter: true,
        selectable: true,
        multiSelectable: true
    };
    const tableHeaderProps: TableHeaderProps = {
        displaySelectAll: true,
        adjustForCheckbox: true,
        enableSelectAll: true
    };
    const tableBodyProps: TableBodyProps = {
        displayRowCheckbox: true,
        deselectOnClickaway: true,
        showRowHover: true,
        stripedRows: true
    };
    const tableFooterProps: TableFooterProps = {
        adjustForCheckbox: true
    };
    interface Header extends TableHeaderColumnProps, TableRowColumnProps {
        text: string;
    }
    const labels: Header[] = [
        { text: 'ID', tooltip: 'id' },
        { text: 'Name', tooltip: '名前' },
        { text: 'Status', tooltip: '状態' },
        { text: '', tooltip: '' }
    ];
    export const component = App.withStore('productsIndex')(() => (
        <div>
            <Card initiallyExpanded={false} className={classes.condition}>
                <CardHeader
                    title="検索条件"
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    <TextField
                        {...Cbn.TwoWay.createProps(
                            action.emitter,
                            action.model.condition,
                            'name',
                            {
                                floatingLabelText: '名前',
                                fullWidth: true
                            }
                        )}
                    />
                    <TextField
                        {...Cbn.TwoWay.createProps(
                            action.emitter,
                            action.model.condition,
                            'status',
                            {
                                floatingLabelText: '状態',
                                fullWidth: true
                            }
                        )}
                    />
                </CardText>
                <CardActions expandable={true} className={classes.action}>
                    <div className={classes['action-right']}>
                        <RaisedButton
                            label="Reset"
                            onClick={() =>
                                action.emitter.emit('initializeCondition')
                            }
                        />
                    </div>
                </CardActions>
            </Card>
            <Card>
                <CardHeader title="検索結果" />
                <CardActions className={classes.action}>
                    <div className={classes['action-left']}>
                        <RaisedButton icon={<ContentAdd />} primary={true} />
                        <RaisedButton
                            icon={<ContentRemove />}
                            secondary={true}
                        />
                        <RaisedButton icon={<NavigationRefresh />} />
                    </div>
                    <div
                        className={`${classes['action-right']} ${
                            classes.pager
                        }`}
                    >
                        <div className={classes['pager-slider']}>
                            <span className={classes['pager-slider-label']}>
                                表示件数:{action.model.condition.pager.display}
                            </span>
                            <Slider
                                {...Cbn.TwoWay.createProps(
                                    action.emitter,
                                    action.model.condition.pager,
                                    'display',
                                    {
                                        min: 10,
                                        max: 100,
                                        step: 10,
                                        sliderStyle: {
                                            maxWidth: '100px',
                                            width: '100px',
                                            margin: 0
                                        }
                                    }
                                )}
                            />
                        </div>
                        <div className={classes['pager-slider']}>
                            <span className={classes['pager-slider-label']}>
                                ページ:{action.model.condition.pager.current +
                                    1}
                            </span>
                            <Slider
                                {...Cbn.TwoWay.createProps(
                                    action.emitter,
                                    action.model.condition.pager,
                                    'current',
                                    {
                                        min: 0,
                                        max: Math.floor(
                                            action.model.condition.pager.total /
                                                action.model.condition.pager
                                                    .display
                                        ),
                                        step: 1,
                                        sliderStyle: {
                                            maxWidth: '100px',
                                            width: '100px',
                                            margin: 0
                                        }
                                    }
                                )}
                            />
                        </div>
                    </div>
                </CardActions>
                <CardText>
                    <Table {...tableProps}>
                        <TableHeader {...tableHeaderProps}>
                            <TableRow>
                                {labels.map((x, i) => (
                                    <TableHeaderColumn {...x} key={`${i}`}>
                                        {x.text}
                                    </TableHeaderColumn>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody {...tableBodyProps}>
                            {action.model.items.map(x => (
                                <TableRow key={x.id}>
                                    <TableRowColumn>{x.id}</TableRowColumn>,
                                    <TableRowColumn>{x.name}</TableRowColumn>,
                                    <TableRowColumn>{x.status}</TableRowColumn>
                                    <TableRowColumn>
                                        {' '}
                                        <FloatingActionButton
                                            mini={true}
                                            secondary={true}
                                        >
                                            <ImageEdit />
                                        </FloatingActionButton>
                                    </TableRowColumn>,
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter {...tableFooterProps}>
                            <TableRow>
                                {labels.map((x, i) => (
                                    <TableRowColumn {...x} key={`${i}`}>
                                        {x.text}
                                    </TableRowColumn>
                                ))}
                            </TableRow>
                        </TableFooter>
                    </Table>
                </CardText>
            </Card>
        </div>
    ));
}
export interface CbnSliderState {
    isInit: boolean;
}
