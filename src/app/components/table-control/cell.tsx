// import * as React from 'react';
// import { decorate } from '../../helper/app-style-helper';
// import { Cbn } from '../../../lib/shared/cbn';
// import { TableCell } from 'material-ui';
// import { TableCellProps } from 'material-ui/Table';

// namespace InnerScope {
//     interface Style {
//         root;
//     }
//     const style: Style = {
//         root: {
//             'text-overflow': 'ellipsis',
//             overflow: 'hidden',
//             'white-space': 'nowrap',
//             position: 'relative'
//         }
//     };
//     export interface Props extends TableCellProps {}
//     export const component = decorate(style)<Props>(sheet => props => {
//         let classes = Cbn.mergeClasses(props.classes, sheet.classes);
//         let mergedprops = Object.assign({}, props, { classes });
//         return <TableCell {...mergedprops}>{props.children}</TableCell>;
//     });
// }
// export type CellProps = InnerScope.Props;
// export const Cell = InnerScope.component;
