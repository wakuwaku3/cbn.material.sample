import * as React from 'react';
import { MouseEvent } from 'react';
import { AppStyle } from '../shared/app-style';
import { Cbn } from '../../lib/shared/cbn';
import { Add } from 'material-ui-icons';
import { AppButton, AppTypography } from './material-ui/wrapper';

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
                <AppTypography.component>{props.name}</AppTypography.component>
                <AppTypography.component>{props.count}</AppTypography.component>
                <AppButton.component
                    variant="fab"
                    color="primary"
                    mini={true}
                    onClick={e => handleClick(e)}
                >
                    <Add />
                </AppButton.component>
            </div>
        );
    };
}
