import * as React from 'react';
import { AppPaperProps, AppPaper } from '../material-ui/wrapper';
import { MouseEventHandler } from 'react';
import { findDOMNode } from 'react-dom';
import { browserAction } from '../../actions/shared/browser-action';
import { Cornor } from './cornor';
import { DividerLine, getDividerLineWidth } from './divider-line';
import { Subscription } from 'rxjs';
import {
    Positioning,
    Vertical,
    Horizontal,
    DivProps,
    Axis,
    StyledProps
} from '../../../lib/models/types';
import { decorate } from '../../../lib/shared/style-helper';
import { StyledComponentBase } from '../../../lib/bases/styled-component-base';
import { StyledEventComponentBase } from '../../../lib/bases/event-component-base';

namespace InnerScope {
    const lineWidth = getDividerLineWidth();
    interface Style {
        item;
        'item-vertical';
        'item-horizontal';
        container;
        'container-vertical';
        'container-horizontal';
        paper;
        content;
    }
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
    export interface Props {
        axis?: Axis;
        elements: JSX.Element[];
        minSize?: number;
        sizes?: number[];
    }
    interface State {
        isActive: boolean;
        activeElementIndex: number;
        x: number;
        y: number;
        w: number;
        h: number;
    }
    interface Event {
        handleDown: { event: React.MouseEvent<HTMLDivElement>; index: number };
        handleResize: void;
        handleMove: any;
        handleUp: void;
    }
    type InnerProps = Props &
        DivProps & {
            onChange?: (sizes: number[]) => void;
        };
    export const Inner = decorate(style)<InnerProps>(
        class extends StyledEventComponentBase<
            Event,
            Style,
            InnerProps,
            State
        > {
            resizeSubscription: Subscription;
            constructor(props) {
                super(props);
                this.state = {
                    isActive: false,
                    activeElementIndex: 0,
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0
                };
            }
            container: HTMLDivElement;
            itemElements: HTMLElement[] = [];
            get isHorizontal() {
                return this.props.axis === 'Horizontal';
            }
            nextHandleMove = e => this.next('handleMove', e);
            nextHandleUp = () => this.next('handleUp');
            componentDidMount() {
                if (super.componentDidMount) super.componentDidMount();
                this.resizeSubscription = browserAction
                    .observe('resize')
                    .subscribe(() => this.next('handleResize'));
                this.container.addEventListener(
                    'mousemove',
                    this.nextHandleMove
                );
                this.container.addEventListener(
                    'mouseleave',
                    this.nextHandleUp
                );
                this.container.addEventListener('mouseup', this.nextHandleUp);
                this.next('handleResize');
            }
            componentWillUnmount() {
                if (super.componentWillUnmount) super.componentWillUnmount();
                this.resizeSubscription.unsubscribe();
                this.container.removeEventListener(
                    'mousemove',
                    this.nextHandleMove
                );
                this.container.removeEventListener(
                    'mouseleave',
                    this.nextHandleUp
                );
                this.container.removeEventListener(
                    'mouseup',
                    this.nextHandleUp
                );
            }
            protected setupObservable() {
                this.observe('handleDown').subscribe(({ event, index }) => {
                    let item = this.itemElements[index];
                    let rect = item.getBoundingClientRect();
                    this.setState({
                        x: event.nativeEvent.pageX,
                        y: event.nativeEvent.pageY,
                        w: rect.width,
                        h: rect.height,
                        isActive: true,
                        activeElementIndex: index
                    });
                });
                this.observe('handleResize').subscribe(() => {
                    let containerRect = this.container.getBoundingClientRect();
                    let rects = this.itemElements.map(x =>
                        x.getBoundingClientRect()
                    );
                    if (this.isHorizontal) {
                        let sum = rects
                            .map(x => x.width)
                            .reduce((p, c) => p + c);
                        let diff = sum - containerRect.width;
                        let sizes = this.allocation(rects, diff);
                        this.props.onChange(sizes);
                    } else {
                        let sum = rects
                            .map(x => x.height)
                            .reduce((p, c) => p + c);
                        let diff = sum - containerRect.height;
                        let sizes = this.allocation(rects, diff);
                        this.props.onChange(sizes);
                    }
                });
                this.observe('handleMove').subscribe(event => {
                    if (this.state.isActive) {
                        event.preventDefault();
                        let i = this.state.activeElementIndex;
                        let item = this.itemElements[i];
                        let rect = item.getBoundingClientRect();
                        let rects = this.itemElements.map(x =>
                            x.getBoundingClientRect()
                        );
                        if (this.isHorizontal) {
                            let p = event.pageX - this.state.x;
                            let len = this.state.w + p;
                            if (len < this.props.minSize) {
                                len = this.props.minSize;
                            }
                            let diff = len - rect.width;
                            let sizes = this.allocation(rects, diff, i, true);
                            sizes[i] = len;
                            this.props.onChange(sizes);
                        } else {
                            let p = event.pageY - this.state.y;
                            let len = this.state.h + p;
                            if (len < this.props.minSize) {
                                len = this.props.minSize;
                            }
                            let diff = len - rect.height;
                            let sizes = this.allocation(rects, diff, i, true);
                            sizes[i] = len;
                            this.props.onChange(sizes);
                        }
                    }
                });
                this.observe('handleUp').subscribe(() => {
                    this.setState({
                        isActive: false
                    });
                });
            }
            allocation = (
                rects: (ClientRect | DOMRect)[],
                diff: number,
                currentIndex?: number,
                isequality?: boolean
            ) => {
                if (this.isHorizontal) {
                    let sizes = rects.map(x => x.width);
                    for (var i = rects.length - 1; i >= 0; --i) {
                        if (isequality && currentIndex === i) continue;
                        let rect = rects[i];
                        let len = rect.width - diff;
                        if (len < this.props.minSize) {
                            len = this.props.minSize;
                        }
                        diff = diff - (rect.width - len);
                        sizes[i] = len;
                        if (diff === 0) {
                            break;
                        }
                    }
                    return sizes;
                } else {
                    let sizes = rects.map(x => x.height);
                    for (var i = rects.length - 1; i >= 0; --i) {
                        if (isequality && currentIndex === i) continue;
                        let rect = rects[i];
                        let len = rect.height - diff;
                        if (len < this.props.minSize) {
                            len = this.props.minSize;
                        }
                        diff = diff - (rect.height - len);
                        sizes[i] = len;
                        if (diff === 0) {
                            break;
                        }
                    }
                    return sizes;
                }
            };
            render() {
                let className =
                    this.props.classes.container +
                    ' ' +
                    this.props.classes[
                        `container-${this.props.axis.toLowerCase()}`
                    ];
                if (this.props.className) {
                    className += ' ' + this.props.className;
                }
                let linePos: Positioning = this.isHorizontal
                    ? 'Right'
                    : 'Bottom';
                let itemClassName =
                    this.props.classes.item +
                    ' ' +
                    this.props.classes[`item-${this.props.axis.toLowerCase()}`];
                let renderChildren = () =>
                    this.props.elements.map((e, i) => {
                        let style = this.isHorizontal
                            ? { width: this.getSizes()[i] }
                            : { height: this.getSizes()[i] };
                        return (
                            <div
                                key={i}
                                ref={el => {
                                    this.itemElements[i] = el;
                                }}
                                className={itemClassName}
                                style={style}
                            >
                                <AppPaper className={this.props.classes.paper}>
                                    {(() => {
                                        if (
                                            i + 1 !==
                                            this.props.elements.length
                                        )
                                            return (
                                                <DividerLine
                                                    positioning={linePos}
                                                    onMouseDown={event =>
                                                        this.next(
                                                            'handleDown',
                                                            { event, index: i }
                                                        )
                                                    }
                                                />
                                            );
                                    })()}
                                    <div className={this.props.classes.content}>
                                        {e}
                                    </div>
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
            getSizes() {
                if (
                    this.props.sizes &&
                    this.props.sizes.length === this.props.elements.length
                ) {
                    return this.props.sizes;
                }
                return this.isHorizontal ? this.getwidths() : this.getheights();
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
    export class component extends React.Component<Props, { sizes: number[] }> {
        constructor(props) {
            super(props);
            this.state = { sizes: this.props.sizes };
        }
        render() {
            return (
                <Inner
                    {...this.props}
                    {...this.state}
                    onChange={sizes => {
                        this.setState({ sizes });
                    }}
                />
            );
        }
    }
    Inner.defaultProps = {
        minSize: 25,
        axis: 'Horizontal',
        onChange: sizes => {}
    };
}
export type DividerContainerProps = InnerScope.Props;
export const PaneContainer = InnerScope.component;
