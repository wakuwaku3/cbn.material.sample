import * as React from 'react';
import { AppPaper } from '../material-ui/wrapper';
import { browserAction } from '../../actions/shared/browser-action';
import { DividerLine, getDividerLineWidth } from './divider-line';
import { Subscription } from 'rxjs';
import { Positioning, DivProps, Axis } from '../../../lib/models/types';
import { decorate } from '../../../lib/shared/style-helper';
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
      position: 'relative',
    },
    'item-vertical': {
      'padding-bottom': lineWidth * 2,
    },
    'item-horizontal': {
      'padding-right': lineWidth * 2,
    },
    container: {
      width: '100%',
      height: '100%',
      '& $item-vertical:last-child': {
        'padding-bottom': 0,
      },
      '& $item-horizontal:last-child': {
        'padding-right': 0,
      },
    },
    'container-vertical': {
      display: 'block',
    },
    'container-horizontal': {
      width: '100%',
      height: '100%',
      display: 'flex',
    },
    paper: {
      width: '100%',
      height: '100%',
      'min-width': 'inherit',
      'min-height': 'inherit',
    },
    content: {
      height: 'inherit',
      overflow: 'auto',
    },
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
    class extends StyledEventComponentBase<Event, Style, InnerProps, State> {
      public resizeSubscription: Subscription;
      constructor(props) {
        super(props);
        this.state = {
          isActive: false,
          activeElementIndex: 0,
          x: 0,
          y: 0,
          w: 0,
          h: 0,
        };
      }
      public container: HTMLDivElement;
      public itemElements: HTMLElement[] = [];
      get isHorizontal() {
        return this.props.axis === 'Horizontal';
      }
      public nextHandleMove = e => this.next('handleMove', e);
      public nextHandleUp = () => this.next('handleUp');
      public componentDidMount() {
        if (super.componentDidMount) {
          super.componentDidMount();
        }
        this.resizeSubscription = browserAction
          .observe('resize')
          .subscribe(() => this.next('handleResize'));
        this.container.addEventListener('mousemove', this.nextHandleMove);
        this.container.addEventListener('mouseleave', this.nextHandleUp);
        this.container.addEventListener('mouseup', this.nextHandleUp);
        this.next('handleResize');
      }
      public componentWillUnmount() {
        if (super.componentWillUnmount) {
          super.componentWillUnmount();
        }
        this.resizeSubscription.unsubscribe();
        this.container.removeEventListener('mousemove', this.nextHandleMove);
        this.container.removeEventListener('mouseleave', this.nextHandleUp);
        this.container.removeEventListener('mouseup', this.nextHandleUp);
      }
      protected setupObservable() {
        this.observe('handleDown').subscribe(({ event, index }) => {
          const item = this.itemElements[index];
          const rect = item.getBoundingClientRect();
          this.setState({
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
            w: rect.width,
            h: rect.height,
            isActive: true,
            activeElementIndex: index,
          });
        });
        this.observe('handleResize').subscribe(() => {
          const containerRect = this.container.getBoundingClientRect();
          const rects = this.itemElements.map(x => x.getBoundingClientRect());
          if (this.isHorizontal) {
            const sum = rects.map(x => x.width).reduce((p, c) => p + c);
            const diff = sum - containerRect.width;
            const sizes = this.allocation(rects, diff);
            this.props.onChange(sizes);
          } else {
            const sum = rects.map(x => x.height).reduce((p, c) => p + c);
            const diff = sum - containerRect.height;
            const sizes = this.allocation(rects, diff);
            this.props.onChange(sizes);
          }
        });
        this.observe('handleMove').subscribe(event => {
          if (this.state.isActive) {
            event.preventDefault();
            const i = this.state.activeElementIndex;
            const item = this.itemElements[i];
            const rect = item.getBoundingClientRect();
            const rects = this.itemElements.map(x => x.getBoundingClientRect());
            if (this.isHorizontal) {
              const p = event.pageX - this.state.x;
              let len = this.state.w + p;
              if (len < this.props.minSize) {
                len = this.props.minSize;
              }
              const diff = len - rect.width;
              const sizes = this.allocation(rects, diff, i, true);
              sizes[i] = len;
              this.props.onChange(sizes);
            } else {
              const p = event.pageY - this.state.y;
              let len = this.state.h + p;
              if (len < this.props.minSize) {
                len = this.props.minSize;
              }
              const diff = len - rect.height;
              const sizes = this.allocation(rects, diff, i, true);
              sizes[i] = len;
              this.props.onChange(sizes);
            }
          }
        });
        this.observe('handleUp').subscribe(() => {
          this.setState({
            isActive: false,
          });
        });
      }
      public allocation = (
        rects: Array<ClientRect | DOMRect>,
        diff: number,
        currentIndex?: number,
        isequality?: boolean,
      ) => {
        if (this.isHorizontal) {
          const sizes = rects.map(x => x.width);
          for (let i = rects.length - 1; i >= 0; --i) {
            if (isequality && currentIndex === i) {
              continue;
            }
            const rect = rects[i];
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
          const sizes = rects.map(x => x.height);
          for (let i = rects.length - 1; i >= 0; --i) {
            if (isequality && currentIndex === i) {
              continue;
            }
            const rect = rects[i];
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
      public render() {
        let className =
          this.props.classes.container +
          ' ' +
          this.props.classes[`container-${this.props.axis.toLowerCase()}`];
        if (this.props.className) {
          className += ' ' + this.props.className;
        }
        const linePos: Positioning = this.isHorizontal ? 'Right' : 'Bottom';
        const itemClassName =
          this.props.classes.item +
          ' ' +
          this.props.classes[`item-${this.props.axis.toLowerCase()}`];
        const renderChildren = () =>
          this.props.elements.map((e, i) => {
            const st = this.isHorizontal
              ? { width: this.getSizes()[i] }
              : { height: this.getSizes()[i] };
            return (
              <div
                key={i}
                ref={el => {
                  this.itemElements[i] = el;
                }}
                className={itemClassName}
                style={st}
              >
                <AppPaper className={this.props.classes.paper}>
                  {(() => {
                    if (i + 1 !== this.props.elements.length) {
                      return (
                        <DividerLine
                          positioning={linePos}
                          onMouseDown={event =>
                            this.next('handleDown', { event, index: i })
                          }
                        />
                      );
                    }
                  })()}
                  <div className={this.props.classes.content}>{e}</div>
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
      public getSizes() {
        if (
          this.props.sizes &&
          this.props.sizes.length === this.props.elements.length
        ) {
          return this.props.sizes;
        }
        return this.isHorizontal ? this.getwidths() : this.getheights();
      }
      public getwidths = () =>
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
      public getheights = () =>
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
    },
  );
  export class component extends React.Component<Props, { sizes: number[] }> {
    constructor(props) {
      super(props);
      this.state = { sizes: this.props.sizes };
    }
    public render() {
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
    onChange: sizes => null,
  };
}
export type DividerContainerProps = InnerScope.Props;
export const PaneContainer = InnerScope.component;
