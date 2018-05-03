import * as React from 'react';
import { AppPaperProps, AppPaper } from '../material-ui/wrapper';
import { browserAction } from '../../actions/shared/browser-action';
import { Cornor } from './cornor';
import { DividerLine, getDividerLineWidth } from './divider-line';
import { Subscription } from 'rxjs';
import {
  Positioning,
  Vertical,
  Horizontal,
  DivProps,
} from '../../../lib/models/types';
import { decorate } from '../../../lib/shared/style-helper';
import { StyledComponentBase } from '../../../lib/bases/styled-component-base';
import { StyledEventComponentBase } from '../../../lib/bases/event-component-base';
import { WindowItemSize } from '../../models/shared/window-item-size';

namespace InnerScope2 {
  interface Style {
    container;
  }
  const style: Style = {
    container: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
  };
  export const component = decorate(style)<DivProps>(
    class extends StyledComponentBase<Style, DivProps> {
      public render() {
        let className = this.props.classes.container;
        if (this.props.className) {
          className += ' ' + this.props.className;
        }
        return (
          <div {...this.props} className={className}>
            {this.props.children}
          </div>
        );
      }
    },
  );
}
namespace InnerScope {
  export interface Props extends Partial<WindowItemSize> {
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
  export interface InnerProps extends Props {
    onChange?: (size: WindowItemSize) => void;
  }
  interface InnerState extends DragFlag {
    x: number;
    y: number;
    w: number;
    h: number;
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
  interface Style {
    move;
    cornor;
    root;
    content;
  }
  export const styles = {
    move: {
      width: '100%',
      position: 'absolute',
      top: lineWidth,
      left: 0,
      height: lineWidth * 3,
      cursor: 'move',
    },
    cornor: {
      opacity: 0,
    },
    root: {
      position: 'absolute',
      '&:hover $cornor': {
        opacity: 1,
      },
    },
    content: {
      padding: [lineWidth * 5, lineWidth * 2, lineWidth * 2],
      overflow: 'auto',
      width: '100%',
      height: '100%',
      'min-width': 'inherit',
      'min-height': 'inherit',
    },
  };
  export interface Event {
    resetZIndex: void;
    handleResize: void;
    handleMove: any;
    handleUp: void;
    handleDown: {
      event: React.MouseEvent<HTMLDivElement>;
      keies: Array<keyof DragFlag | string>;
    };
  }
  export const Inner = decorate(styles)<InnerProps>(
    class extends StyledEventComponentBase<
      Event,
      Style,
      InnerProps,
      InnerState
    > {
      public resizeSubscription: Subscription;
      public node: HTMLDivElement;
      constructor(props) {
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
        };
      }
      public getParent = () => {
        if (this.props.findParent) {
          const node = this.props.findParent();
          if (node) {
            return node;
          }
        }
        return document.body;
      };
      public nextResetZIndex = () => this.next('resetZIndex');
      public nextHandleMove = e => this.next('handleMove', e);
      public nextHandleUp = () => this.next('handleUp');
      public componentDidMount() {
        if (super.componentDidMount) { super.componentDidMount(); }
        this.resizeSubscription = browserAction
          .observe('resize')
          .subscribe(() => {
            this.next('handleResize');
          });
        const elm = this.getParent();
        elm.addEventListener('mousedown', this.nextResetZIndex);
        elm.addEventListener('mousemove', this.nextHandleMove);
        elm.addEventListener('mouseleave', this.nextHandleUp);
        elm.addEventListener('mouseup', this.nextHandleUp);
      }
      public componentWillUnmount() {
        if (super.componentWillUnmount) {
          super.componentWillUnmount();
        }
        this.resizeSubscription.unsubscribe();
        const elm = this.getParent();
        elm.removeEventListener('mousedown', this.nextResetZIndex);
        elm.removeEventListener('mousemove', this.nextHandleMove);
        elm.removeEventListener('mouseleave', this.nextHandleUp);
        elm.removeEventListener('mouseup', this.nextHandleUp);
      }
      public changeSize = (p: Partial<WindowItemSize>) => {
        const size = Object.assign({}, defaultSize, this.props, p);
        if (this.props.onChange) {
          this.props.onChange(size);
        }
      };
      protected setupObservable() {
        this.observe('resetZIndex').subscribe(() =>
          this.changeSize({ zIndex: 0 }),
        );
        this.observe('handleResize').subscribe(() =>
          this.changeSize(this.adjust(this.getRect())),
        );
        this.observe('handleDown').subscribe(({ event, keies }) => {
          const item = this.node;
          const rect = item.getBoundingClientRect();
          const s = {
            x: event.nativeEvent.pageX - item.offsetLeft,
            y: event.nativeEvent.pageY - item.offsetTop,
            isActive: true,
            w: rect.width,
            h: rect.height,
          };
          if (keies) {
            keies.forEach(k => {
              s[k] = true;
            });
          }
          this.changeSize({ zIndex: 1 });
          this.setState(s);
        });
        this.observe('handleMove').subscribe(event => {
          if (this.state.isActive) {
            event.preventDefault();
            const rect = this.getRect();
            if (this.state.isMove) {
              rect.top = event.pageY - this.state.y;
              rect.left = event.pageX - this.state.x;
            }
            if (this.state.isChangeTop) {
              const p = event.pageY - this.state.y;
              rect.height += rect.top - p;
              if (rect.height >= this.props.minHeight) {
                rect.top = p;
              }
            }
            if (this.state.isChangeLeft) {
              const p = event.pageX - this.state.x;
              rect.width += rect.left - p;
              if (rect.width >= this.props.minWidth) {
                rect.left = p;
              }
            }
            if (this.state.isChangeBottom) {
              const p = event.pageY - this.state.y;
              rect.height = this.state.h + p - rect.top;
            }
            if (this.state.isChangeRight) {
              const p = event.pageX - this.state.x;
              rect.width = this.state.w + p - rect.left;
            }
            const isAdjustSize =
              this.state.isChangeBottom || this.state.isChangeRight;
            this.changeSize(this.adjust(rect, isAdjustSize));
            browserAction.next('resize');
          }
        });
        this.observe('handleUp').subscribe(() => {
          this.setState({
            isActive: false,
            isMove: false,
            isChangeTop: false,
            isChangeRight: false,
            isChangeBottom: false,
            isChangeLeft: false,
          });
        });
      }
      public getRect = () => {
        const item = this.node;
        const parentRect = this.getParent().getBoundingClientRect();
        const rect = item.getBoundingClientRect();
        return {
          top: rect.top - parentRect.top,
          left: rect.left - parentRect.left,
          width: rect.width,
          height: rect.height,
        };
      };
      public adjust = (rect: Rect, isAdjustSize?: boolean) => {
        const parentRect = this.getParent().getBoundingClientRect();
        if (rect.left < 0) {
          rect.left = 0;
        }
        if (rect.top < 0) {
          rect.top = 0;
        }

        if (rect.left + lineWidth * 5 > parentRect.width) {
          if (!isAdjustSize) {
            rect.left = parentRect.width - lineWidth * 5;
            if (rect.left < 0) {
              rect.width += rect.left;
              rect.left = 0;
            }
          }
        }
        if (rect.top + lineWidth * 5 > parentRect.height) {
          if (isAdjustSize) {
            rect.top = parentRect.height - lineWidth * 5;
            if (rect.top < 0) {
              rect.height += rect.top;
              rect.top = 0;
            }
          }
        }

        if (rect.width <= this.props.minWidth) {
          rect.width = this.props.minWidth;
        }
        if (rect.height <= this.props.minHeight) {
          rect.height = this.props.minHeight;
        }
        return rect;
      };
      public getMove = () => (
        <div
          key="move"
          className={this.props.classes.move}
          onMouseDown={event =>
            this.next('handleDown', { event, keies: ['isMove'] })
          }
        />
      );
      public getLine = (pos: Positioning) => {
        const key = `line${pos}`;
        const name = `isChange${pos}`;
        return (
          <DividerLine
            positioning={pos}
            key={key}
            onMouseDown={event =>
              this.next('handleDown', { event, keies: [name] })
            }
          />
        );
      };
      public getCornor = (vdir: Vertical, hdir: Horizontal) => {
        const key = `cornor${vdir}${hdir}`;
        const vname = `isChange${vdir}`;
        const hname = `isChange${hdir}`;
        return (
          <Cornor
            key={key}
            vertical={vdir}
            horizontal={hdir}
            className={this.props.classes.cornor}
            onMouseDown={event =>
              this.next('handleDown', {
                event,
                keies: [vname, hname],
              })
            }
          />
        );
      };
      public getInner = () => {
        const array = [];
        if (this.props.move) {
          array.push(this.getMove());
        }
        if (this.props.resizeTop) {
          array.push(this.getLine('Top'));
        }
        if (this.props.resizebottom) {
          array.push(this.getLine('Bottom'));
        }
        if (this.props.resizeLeft) {
          array.push(this.getLine('Left'));
        }
        if (this.props.resizeRight) {
          array.push(this.getLine('Right'));
        }
        if (this.props.resizeTop && this.props.resizeRight) {
          array.push(this.getCornor('Top', 'Right'));
        }
        if (this.props.resizeTop && this.props.resizeLeft) {
          array.push(this.getCornor('Top', 'Left'));
        }
        if (this.props.resizebottom && this.props.resizeRight) {
          array.push(this.getCornor('Bottom', 'Right'));
        }
        if (this.props.resizebottom && this.props.resizeLeft) {
          array.push(this.getCornor('Bottom', 'Left'));
        }
        return array;
      };
      public render() {
        let className = this.props.classes.content;
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
            className={this.props.classes.root}
            style={{
              top: this.props.top,
              left: this.props.left,
              width: this.props.width,
              height: this.props.height,
              zIndex: this.props.zIndex,
            }}
            onMouseDown={event => this.next('handleDown', { event, keies: [] })}
          >
            <AppPaper {...this.props.paperProps} className={className}>
              {this.getInner()}
              {this.props.children}
            </AppPaper>
          </div>
        );
      }
    },
  );

  export class component extends React.Component<Props, WindowItemSize> {
    public static defaultProps: Partial<Props>;

    constructor(props) {
      super(props);
      this.state = {
        top: this.props.top,
        left: this.props.left,
        width: this.props.width,
        height: this.props.height,
        zIndex: this.props.zIndex,
      };
    }
    public render() {
      return (
        <Inner
          {...this.props}
          {...this.state}
          onChange={x => {
            this.setState(x);
          }}
        >
          {this.props.children}
        </Inner>
      );
    }
  }
  const defaultSize = {
    top: 0,
    left: 0,
    width: 'inherit',
    height: 'inherit',
    zIndex: 0,
  };
  component.defaultProps = Object.assign(
    {
      move: true,
      resizeTop: true,
      resizeRight: true,
      resizebottom: true,
      resizeLeft: true,
      minWidth: 25,
      minHeight: 25,
    },
    defaultSize,
  );
}
export type WindowItemProps = InnerScope.Props;
export const WindowContainer = InnerScope2.component;
export const WindowItem = InnerScope.component;
