import * as React from 'react';
import { MouseEvent } from 'react';
import { App } from '../shared/app';
import { Cbn } from '../../lib/shared/cbn';
import { FloatingActionButton } from 'material-ui';
import { ContentAdd } from 'material-ui/svg-icons';

export namespace Counter {
    export interface Props {
        name: string;
        count: number;
        onClick?: React.MouseEventHandler<{}>;
    }
    export const component: React.SFC<Props> = props => {
        let handleClick = (e: MouseEvent<{}>) => {
            if (props.onClick) {
                props.onClick(e);
            }
        };
        return (
            <div>
                <h2>{props.name}</h2>
                <div>{props.count}</div>
                <FloatingActionButton mini={true} onClick={e => handleClick(e)}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    };
}
