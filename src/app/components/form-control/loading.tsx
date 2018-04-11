import * as React from 'react';
import { CircularProgressProps, CircularProgress } from 'material-ui/Progress';

export namespace InnerScope {
    export interface Props extends CircularProgressProps {}
    export const component: React.SFC<Props> = props => <CircularProgress {...props} />;
}
export type LoadingProps = InnerScope.Props;
export const Loading = InnerScope.component;
