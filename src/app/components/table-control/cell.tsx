import * as React from 'react';
import { TableCell } from 'material-ui';
import { TableCellProps } from 'material-ui/Table';
import { decorate, mergeClasses } from '../../../lib/shared/style-helper';

namespace InnerScope {
    interface Style {
        root;
    }
    const style: Style = {
        root: {
            'text-overflow': 'ellipsis',
            overflow: 'hidden',
            'white-space': 'nowrap',
            position: 'relative'
        }
    };
    export interface Props extends TableCellProps {}
    export const component = decorate(style)<Props>(props => {
        let classes = mergeClasses(props.classes, props.classes);
        let mergedprops = Object.assign({}, props, { classes });
        return <TableCell {...mergedprops}>{props.children}</TableCell>;
    });
}
export type CellProps = InnerScope.Props;
export const Cell = InnerScope.component;
