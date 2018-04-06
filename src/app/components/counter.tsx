import * as React from 'react';
import { MouseEvent } from 'react';
import { App } from '../shared/app';
import { Cbn } from '../../lib/shared/cbn';
import { Add } from 'material-ui-icons';
import { Button, Typography } from 'material-ui';

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
                <Typography>{props.name}</Typography>
                <Typography>{props.count}</Typography>
                <Button
                    variant="fab"
                    color="primary"
                    mini={true}
                    onClick={e => handleClick(e)}
                >
                    <Add />
                </Button>
            </div>
        );
    };
}
