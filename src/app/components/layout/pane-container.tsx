import * as React from 'react';
import { decorate } from '../../helper/app-style-helper';
import { AppPaperProps, AppPaper } from '../material-ui/wrapper';
import { MouseEventHandler } from 'react';
import { findDOMNode } from 'react-dom';
import { browserAction } from '../../actions/shared/browser-action';
import { Cornor } from './cornor';
import { DividerLine, getDividerLineWidth } from './divider-line';
import { Subscription } from 'rxjs';
import { Positioning, Vertical, Horizontal, DivProps, Axis } from '../../../lib/models/types';

namespace InnerScope {
    export interface Props {
        axis?: Axis;
        elements: JSX.Element[];
        minSize?: number;
    }
    interface State {
        isActive: boolean;
        activeElementIndex: number;
        x: number;
        y: number;
        w: number;
        h: number;
        widths: (string | number)[];
        heights: (string | number)[];
    }
    const lineWidth = getDividerLineWidth();
    const style = {
        item: {
            width: '100%',
            position: 'relative'
        },
        'item-vertical': {
            'padding-bottom': lineWidth * 2
        },
        'item-horizontal': {
            'padding-right': lineWidth * 2
        },
        container: {
            width: '100%',
            height: '100%',
            '& $item-vertical:last-child': {
                'padding-bottom': 0
            },
            '& $item-horizontal:last-child': {
                'padding-right': 0
            }
        },
        'container-vertical': {
            display: 'block'
        },
        'container-horizontal': {
            width: '100%',
            height: '100%',
            display: 'flex'
        },
        paper: {
            width: '100%',
            height: '100%',
            'min-width': 'inherit',
            'min-height': 'inherit'
        },
        content: {
            height: 'inherit',
            overflow: 'auto'
        }
    };
    export const containerComponent = decorate(style)<Props & DivProps>(
        sheet =>
            class extends React.Component<Props & DivProps, State> {
                resizeSubscription: Subscription;
                constructor(props: Props) {
                    super(props);
                    this.state = {
                        isActive: false,
                        activeElementIndex: 0,
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        widths: this.getwidths(),
                        heights: this.getheights()
                    };
                }
                container: HTMLDivElement;
                itemElements: HTMLElement[] = [];
                get isHorizontal() {
                    return this.props.axis === 'Horizontal';
                }
                componentDidMount() {
                    this.resizeSubscription = browserAction.observe('resize').subscribe(() => {
                        this.handleResize();
                    });
                    this.container.addEventListener('mousemove', this.handleMove);
                    this.container.addEventListener('mouseleave', this.handleUp);
                    this.container.addEventListener('mouseup', this.handleUp);
                    this.handleResize();
                }
                componentWillUnmount() {
                    this.resizeSubscription.unsubscribe();
                    this.container.removeEventListener('mousemove', this.handleMove);
                    this.container.removeEventListener('mouseleave', this.handleUp);
                    this.container.removeEventListener('mouseup', this.handleUp);
                }
                handleResize = () => {
                    let containerRect = this.container.getBoundingClientRect();
                    let rects = this.itemElements.map(x => x.getBoundingClientRect());
                    if (this.isHorizontal) {
                        let sum = rects.map(x => x.width).reduce((p, c) => p + c);
                        let diff = sum - containerRect.width;
                        let states = this.allocation(rects, diff);
                        this.setState({ widths: states });
                    } else {
                        let sum = rects.map(x => x.height).reduce((p, c) => p + c);
                        let diff = sum - containerRect.height;
                        let states = this.allocation(rects, diff);
                        this.setState({ heights: states });
                    }
                };
                handleDown = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
                    let item = this.itemElements[i];
                    let rect = item.getBoundingClientRect();
                    this.setState({
                        x: e.nativeEvent.pageX,
                        y: e.nativeEvent.pageY,
                        w: rect.width,
                        h: rect.height,
                        isActive: true,
                        activeElementIndex: i
                    });
                };
                handleMove = e => {
                    if (this.state.isActive) {
                        e.preventDefault();
                        let i = this.state.activeElementIndex;
                        let item = this.itemElements[i];
                        let rect = item.getBoundingClientRect();
                        let rects = this.itemElements.map(x => x.getBoundingClientRect());
                        if (this.isHorizontal) {
                            let p = e.pageX - this.state.x;
                            let len = this.state.w + p;
                            if (len < this.props.minSize) {
                                len = this.props.minSize;
                            }
                            let diff = len - rect.width;
                            let states = this.allocation(rects, diff, i, true);
                            states[i] = len;
                            this.setState({ widths: states });
                        } else {
                            let p = e.pageY - this.state.y;
                            let len = this.state.h + p;
                            if (len < this.props.minSize) {
                                len = this.props.minSize;
                            }
                            let diff = len - rect.height;
                            let states = this.allocation(rects, diff, i, true);
                            states[i] = len;
                            this.setState({ heights: states });
                        }
                    }
                };
                allocation = (
                    rects: (ClientRect | DOMRect)[],
                    diff: number,
                    currentIndex?: number,
                    isequality?: boolean
                ) => {
                    if (this.isHorizontal) {
                        let states = this.state.widths;
                        for (var i = rects.length - 1; i >= 0; --i) {
                            if (isequality && currentIndex === i) continue;
                            let rect = rects[i];
                            let len = rect.width - diff;
                            if (len < this.props.minSize) {
                                len = this.props.minSize;
                            }
                            diff = diff - (rect.width - len);
                            states[i] = len;
                            if (diff === 0) {
                                break;
                            }
                        }
                        return states;
                    } else {
                        let states = this.state.heights;
                        for (var i = rects.length - 1; i >= 0; --i) {
                            if (isequality && currentIndex === i) continue;
                            let rect = rects[i];
                            let len = rect.height - diff;
                            if (len < this.props.minSize) {
                                len = this.props.minSize;
                            }
                            diff = diff - (rect.height - len);
                            states[i] = len;
                            if (diff === 0) {
                                break;
                            }
                        }
                        return states;
                    }
                };
                handleUp = () => {
                    this.setState({
                        isActive: false
                    });
                };
                render() {
                    let className =
                        sheet.classes.container + ' ' + sheet.classes[`container-${this.props.axis.toLowerCase()}`];
                    if (this.props.className) {
                        className += ' ' + this.props.className;
                    }
                    let linePos: Positioning = this.isHorizontal ? 'Right' : 'Bottom';
                    let itemClassName =
                        sheet.classes.item + ' ' + sheet.classes[`item-${this.props.axis.toLowerCase()}`];
                    let renderChildren = () =>
                        this.props.elements.map((e, i) => {
                            return (
                                <div
                                    key={i}
                                    ref={el => {
                                        this.itemElements[i] = el;
                                    }}
                                    className={itemClassName}
                                    style={{
                                        height: this.state.heights[i],
                                        width: this.state.widths[i]
                                    }}
                                >
                                    <AppPaper className={sheet.classes.paper}>
                                        {(() => {
                                            if (i + 1 !== this.props.elements.length)
                                                return (
                                                    <DividerLine
                                                        positioning={linePos}
                                                        onMouseDown={e => this.handleDown(e, i)}
                                                    />
                                                );
                                        })()}
                                        <div className={sheet.classes.content}>{e}</div>
                                    </AppPaper>
                                </div>
                            );
                        });

                    return (
                        <div
                            className={className}
                            ref={el => {
                                this.container = el;
                            }}
                        >
                            {renderChildren()}
                        </div>
                    );
                }
                getwidths = () =>
                    this.props.elements.map((e, i) => {
                        let width = '100%';
                        if (this.props.axis === 'Horizontal') {
                            let p = Math.floor(100 / this.props.elements.length);
                            if (i + 1 !== this.props.elements.length) {
                                p = 100 - p * this.props.elements.length + p;
                            }
                            width = `${p}%`;
                        }
                        return width;
                    });
                getheights = () =>
                    this.props.elements.map((e, i) => {
                        let height = '100%';
                        if (this.props.axis === 'Vertical') {
                            let p = Math.floor(100 / this.props.elements.length);
                            if (i + 1 !== this.props.elements.length) {
                                p = 100 - p * this.props.elements.length + p;
                            }
                            height = `${p}%`;
                        }
                        return height;
                    });
            }
    );
    containerComponent.defaultProps = {
        minSize: 25,
        axis: 'Horizontal'
    };
}
export type DividerContainerProps = InnerScope.Props;
export const PaneContainer = InnerScope.containerComponent;
