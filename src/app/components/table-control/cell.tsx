import * as React from 'react';
import { TableCell } from 'material-ui';
import { TableCellProps } from 'material-ui/Table';
import { decorate, } from '../../../lib/shared/style-helper';

namespace InnerScope {
  interface Style {
    root;
    container;
  }
  const style: Style = {
    root: {
      'text-overflow': 'ellipsis',
      overflow: 'hidden',
      'white-space': 'nowrap',
      height: 0,
      padding: 0,
    },
    container: {
      position: 'relative',
      display: 'flex',
      height: '100%',
      'align-items': 'center',
      padding: [4, 56, 4, 24],
    },
  };
  export interface Props extends TableCellProps {}
  export const component = decorate(style)<Props>(props => {
    return (
      <TableCell {...props}>
        <div className={props.classes.container}>{props.children}</div>
      </TableCell>
    );
  });
}
export type CellProps = InnerScope.Props;
export const Cell = InnerScope.component;
