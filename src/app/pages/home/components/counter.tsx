// import * as React from 'react';
// import { MouseEvent } from 'react';
// import {
//     AppTypography,
//     AppButton
// } from '../../../components/material-ui/wrapper';
// import { AddIcon } from '../../../components/material-ui/icon-wrapper';

// namespace InnerScope {
//     export interface Props {
//         name: string;
//         count: number;
//         onClick?: React.MouseEventHandler<{}>;
//     }
//     export const component: React.SFC<Props> = props => {
//         let handleClick = (e: MouseEvent<{}>) => {
//             if (props.onClick) {
//                 props.onClick(e);
//             }
//         };
//         return (
//             <div>
//                 <AppTypography>{props.name}</AppTypography>
//                 <AppTypography>{props.count}</AppTypography>
//                 <AppButton
//                     variant="fab"
//                     color="primary"
//                     mini={true}
//                     onClick={e => handleClick(e)}
//                 >
//                     <AddIcon />
//                 </AppButton>
//             </div>
//         );
//     };
// }
// export type CounterProps = InnerScope.Props;
// export const Counter = InnerScope.component;
