import * as React from 'react';
import { CellProps, Cell } from './cell';
import { Sorting } from '../../models/shared/sorting';
import { Classes } from '../../models/shared/types';
import { decorate } from '../../helper/app-style-helper';
import { DividerLine } from '../layout/divider-line';
import { TableSortLabel } from 'material-ui';
import { Cbn } from '../../../lib/shared/cbn';

namespace InnerScope {
    export interface Props {
        cellProps?: CellProps;
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
                        <Cell {...cellProps} className={classes.root}>
                            {this.getLine()}
                            {this.getContent()}
                        </Cell>
                    );
                }
            }
    );
    component.defaultProps = {
        minWidth: 25
    };
}
export type HeadCellProps = InnerScope.Props;
export const HeadCell = InnerScope.component;
