import * as React from 'react';
import { CellProps, Cell } from './cell';
import { DividerLine } from '../layout/divider-line';
import { TableSortLabel } from 'material-ui';
import { Sorting } from '../../../lib/models/sorting';
import { Classes } from '../../../lib/models/types';
import { decorate } from '../../../lib/shared/style-helper';
import { StyledComponentBase } from '../../../lib/bases/styled-component-base';

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
    dummy;
  }
  const style: Style = {
    dummy: {
      position: 'absolute',
      width: '100%',
      height: 1,
      top: 0,
      left: 0,
    },
  };
  export const component = decorate(style)<Props>(
    class extends StyledComponentBase<Style, Props, State> {
      public element: HTMLDivElement;
      constructor(props) {
        super(props);
        this.state = { isDrag: false, x: 0, w: 0 };
      }
      get isActive() {
        return (
          this.props.sorting && this.props.sorting.name === this.props.name
        );
      }
      public componentDidMount() {
        document.body.addEventListener('mousemove', this.handleMove);
        document.body.addEventListener('mouseleave', this.handleUp);
        document.body.addEventListener('mouseup', this.handleUp);
      }
      public componentWillUnmount() {
        document.body.removeEventListener('mousemove', this.handleMove);
        document.body.removeEventListener('mouseleave', this.handleUp);
        document.body.removeEventListener('mouseup', this.handleUp);
      }
      public handleDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = this.element.getBoundingClientRect();
        this.setState({
          x: e.nativeEvent.pageX,
          w: rect.width,
          isDrag: true,
        });
      };
      public handleMove = e => {
        if (this.state.isDrag) {
          e.preventDefault();
          const p = e.pageX - this.state.x;
          const len = this.state.w + p;
          if (len >= this.props.minWidth) {
            this.props.onSizeChange(len);
          }
        }
      };
      public handleUp = () => {
        this.setState({ isDrag: false });
      };
      public getLine = () => {
        if (this.props.onSizeChange) {
          return [
            <div
              key={0}
              className={this.props.classes.dummy}
              ref={e => (this.element = e)}
            />,
            <DividerLine
              key={1}
              positioning="Right"
              onMouseDown={e => this.handleDown(e)}
            />,
          ];
        }
      };
      public getContent = () => {
        if (this.props.sorting && this.props.onSort) {
          return (
            <TableSortLabel
              active={this.isActive}
              direction={this.props.sorting.direction}
              onClick={e => {
                const s: Sorting = {
                  name: this.props.name,
                  direction: 'asc',
                };
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
      public render() {
        const cellProps = Object.assign({}, this.props.cellProps, {
          sortDirection: this.isActive ? this.props.sorting.direction : false,
        });
        return (
          <Cell {...cellProps}>
            {this.getLine()}
            {this.getContent()}
          </Cell>
        );
      }
    },
  );
  component.defaultProps = {
    minWidth: 25,
  };
}
export type HeadCellProps = InnerScope.Props;
export const HeadCell = InnerScope.component;
