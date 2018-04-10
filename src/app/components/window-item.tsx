import * as React from 'react';
import { decorate } from '../helper/app-style-helper';
import { AppPaperProps, AppPaper } from './material-ui/wrapper';
import { MouseEventHandler } from 'react';
import { findDOMNode } from 'react-dom';
import { browserAction } from '../actions/shared/browser-action';
import { Positioning, Vertical, Horizontal, DivProps } from '../models/shared/types';
import { Cornor } from './cornor';
import { DividerLine, getDividerLineWidth } from './divider-line';

namespace InnerScope {
    const containerStyle = {
        container: {
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        }
    };
    export const containerComponent = decorate(containerStyle)<DivProps>(
        sheet =>
            class extends React.Component<DivProps> {
                render() {
                    let className = sheet.classes.container;
                    if (this.props.className) {
                        className += ' ' + this.props.className;
                    }
                    return (
                        <div {...this.props} className={className}>
                            {this.props.children}
                        </div>
                    );
                }
            }
    );
    export interface Props extends Partial<State> {
        paperProps?: AppPaperProps;
        className?: string;
        resizeTop?: boolean;
        resizeRight?: boolean;
        resizebottom?: boolean;
        resizeLeft?: boolean;
        move?: boolean;
        findParent?: () => Element;
        minWidth?: number;
        minHeight?: number;
    }
    interface State extends DragFlag {
        x: number;
        y: number;
        w: number;
        h: number;
        top: number;
        left: number;
        width: string | number;
        height: string | number;
        zIndex: number;
    }
    interface Rect {
        top: number;
        left: number;
        width: number;
        height: number;
    }
    interface DragFlag {
        isActive: boolean;
        isMove: boolean;
        isChangeTop: boolean;
        isChangeRight: boolean;
        isChangeBottom: boolean;
        isChangeLeft: boolean;
    }
    const lineWidth = getDividerLineWidth();
    export const styles = {
        move: {
            width: '100%',
            position: 'absolute',
            top: lineWidth,
            left: 0,
            height: lineWidth * 3,
            cursor: 'move'
        },
        cornor: {
            opacity: 0
        },
        root: {
            position: 'absolute',
            '&:hover $cornor': {
                opacity: 1
            }
        },
        content: {
            padding: [lineWidth * 5, lineWidth * 2, lineWidth * 2],
            width: '100%',
            height: '100%',
            'min-width': 'inherit',
            'min-height': 'inherit'
        }
    };
    export const component = decorate(styles)<Props>(
        sheet =>
            class extends React.Component<Props, State> {
                node: HTMLDivElement;
                constructor(props: Props) {
                    super(props);
                    this.state = {
                        isActive: false,
                        isMove: false,
                        isChangeTop: false,
                        isChangeRight: false,
                        isChangeBottom: false,
                        isChangeLeft: false,
                        w: 0,
                        h: 0,
                        x: 0,
                        y: 0,
                        zIndex: 0,
                        top: this.props.top,
                        left: this.props.left,
                        width: this.props.width,
                        height: this.props.height
                    };
                    browserAction.observe('resize').subscribe(() => {
                        this.handleResize();
                    });
                }
                getParent = () => {
                    if (this.props.findParent) {
                        let node = this.props.findParent();
                        if (node) {
                            return node;
                        }
                    }
                    return document.body;
                };
                componentDidMount() {
                    let elm = this.getParent();
                    elm.addEventListener('mousedown', this.resetZIndex);
                    elm.addEventListener('mousemove', this.handleMove);
                    elm.addEventListener('mouseleave', this.handleUp);
                    elm.addEventListener('mouseup', this.handleUp);
                }
                componentWillUnmount() {
                    let elm = this.getParent();
                    elm.removeEventListener('mousedown', this.resetZIndex);
                    elm.removeEventListener('mousemove', this.handleMove);
                    elm.removeEventListener('mouseleave', this.handleUp);
                    elm.removeEventListener('mouseup', this.handleUp);
                }
                resetZIndex = () => {
                    this.setState({ zIndex: 0 });
                };
                handleResize = () => {
                    this.setState(this.adjust(this.getRect()));
                };
                getRect = () => {
                    let item = this.node;
                    let rect = item.getBoundingClientRect();
                    return {
                        top: this.state.top,
                        left: this.state.left,
                        width: rect.width,
                        height: rect.height
                    };
                };
                handleDown = (e: React.MouseEvent<HTMLDivElement>, ...key: (keyof DragFlag | string)[]) => {
                    let item = this.node;
                    let rect = item.getBoundingClientRect();
                    let s = {
                        x: e.nativeEvent.pageX - item.offsetLeft,
                        y: e.nativeEvent.pageY - item.offsetTop,
                        zIndex: 1,
                        isActive: true,
                        w: rect.width,
                        h: rect.height
                    };
                    if (key) {
                        key.forEach(k => {
                            s[k] = true;
                        });
                    }
                    this.setState(s);
                };
                handleMove = e => {
                    if (this.state.isActive) {
                        e.preventDefault();
                        let rect = this.getRect();
                        if (this.state.isMove) {
                            rect.top = e.pageY - this.state.y;
                            rect.left = e.pageX - this.state.x;
                        }
                        if (this.state.isChangeTop) {
                            let p = e.pageY - this.state.y;
                            rect.height += rect.top - p;
                            if (rect.height >= this.props.minHeight) {
                                rect.top = p;
                            }
                        }
                        if (this.state.isChangeLeft) {
                            let p = e.pageX - this.state.x;
                            rect.width += rect.left - p;
                            if (rect.width >= this.props.minWidth) {
                                rect.left = p;
                            }
                        }
                        if (this.state.isChangeBottom) {
                            let p = e.pageY - this.state.y;
                            rect.height = this.state.h + p - rect.top;
                        }
                        if (this.state.isChangeRight) {
                            let p = e.pageX - this.state.x;
                            rect.width = this.state.w + p - rect.left;
                        }
                        let isAdjustSize = this.state.isChangeBottom || this.state.isChangeRight;
                        this.setState(this.adjust(rect, isAdjustSize));
                        browserAction.emit('resize');
                    }
                };
                adjust = (rect: Rect, isAdjustSize?: boolean) => {
                    let parentRect = this.getParent().getBoundingClientRect();
                    if (rect.left < 0) rect.left = 0;
                    if (rect.top < 0) rect.top = 0;
                    if (rect.left + rect.width > parentRect.width) {
                        if (isAdjustSize) {
                            rect.width = parentRect.width - rect.left;
                        } else {
                            rect.left = parentRect.width - rect.width;
                            if (rect.left < 0) {
                                rect.width += rect.left;
                                rect.left = 0;
                            }
                        }
                    }
                    if (rect.top + rect.height > parentRect.height) {
                        if (isAdjustSize) {
                            rect.height = parentRect.height - rect.top;
                        } else {
                            rect.top = parentRect.height - rect.height;
                            if (rect.top < 0) {
                                rect.height += rect.top;
                                rect.top = 0;
                            }
                        }
                    }
                    if (rect.width <= this.props.minWidth) rect.width = this.props.minWidth;
                    if (rect.height <= this.props.minHeight) rect.height = this.props.minHeight;
                    return rect;
                };
                handleUp = () => {
                    this.setState({
                        isActive: false,
                        isMove: false,
                        isChangeTop: false,
                        isChangeRight: false,
                        isChangeBottom: false,
                        isChangeLeft: false
                    });
                };
                getMove = () => (
                    <div key="move" className={sheet.classes.move} onMouseDown={e => this.handleDown(e, 'isMove')} />
                );
                getLine = (pos: Positioning) => {
                    let key = `line${pos}`;
                    let name = `isChange${pos}`;
                    return <DividerLine positioning={pos} key={key} onMouseDown={e => this.handleDown(e, name)} />;
                };
                getCornor = (vdir: Vertical, hdir: Horizontal) => {
                    let key = `cornor${vdir}${hdir}`;
                    let vname = `isChange${vdir}`;
                    let hname = `isChange${hdir}`;
                    return (
                        <Cornor
                            key={key}
                            vertical={vdir}
                            horizontal={hdir}
                            className={sheet.classes.cornor}
                            onMouseDown={e => this.handleDown(e, vname, hname)}
                        />
                    );
                };
                getInner = () => {
                    let array = [];
                    if (this.props.move) array.push(this.getMove());
                    if (this.props.resizeTop) array.push(this.getLine('Top'));
                    if (this.props.resizebottom) array.push(this.getLine('Bottom'));
                    if (this.props.resizeLeft) array.push(this.getLine('Left'));
                    if (this.props.resizeRight) array.push(this.getLine('Right'));
                    if (this.props.resizeTop && this.props.resizeRight) array.push(this.getCornor('Top', 'Right'));
                    if (this.props.resizeTop && this.props.resizeLeft) array.push(this.getCornor('Top', 'Left'));
                    if (this.props.resizebottom && this.props.resizeRight)
                        array.push(this.getCornor('Bottom', 'Right'));
                    if (this.props.resizebottom && this.props.resizeLeft) array.push(this.getCornor('Bottom', 'Left'));
                    return array;
                };
                render() {
                    let className = sheet.classes.content;
                    if (this.props.className) {
                        className += ' ' + this.props.className;
                    }
                    if (this.props.paperProps && this.props.paperProps.className) {
                        className += ' ' + this.props.paperProps.className;
                    }
                    return (
                        <div
                            ref={node => {
                                this.node = node;
                            }}
                            className={sheet.classes.root}
                            style={{
                                top: this.state.top,
                                left: this.state.left,
                                width: this.state.width,
                                height: this.state.height,
                                minWidth: this.props.minWidth,
                                minHeight: this.props.minHeight,
                                zIndex: this.state.zIndex
                            }}
                            onMouseDown={this.handleDown}
                        >
                            <AppPaper {...this.props.paperProps} className={className}>
                                {this.getInner()}
                                {this.props.children}
                            </AppPaper>
                        </div>
                    );
                }
            }
    );
    component.defaultProps = {
        move: true,
        resizeTop: true,
        resizeRight: true,
        resizebottom: true,
        resizeLeft: true,
        top: 0,
        left: 0,
        width: 'inherit',
        height: 'inherit',
        minWidth: 25,
        minHeight: 25
    };
}
export type WindowItemProps = InnerScope.Props;
export const WindowContainer = InnerScope.containerComponent;
export const WindowItem = InnerScope.component;
