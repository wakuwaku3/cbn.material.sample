import * as React from 'react';
import { AdjusterProps, Adjuster } from './adjuster';
import { decorate } from '../../helper/app-style-helper';

namespace InnerScope {
    let style = {
        'button-container': {
            display: 'flex',
            'align-items': 'center',
            '& button': { 'margin-right': '4px' },
            'overflow-x': 'auto'
        }
    };
    export interface Props {
        horizontal?: 'left' | 'center' | 'right';
        elements: JSX.Element[];
        adjusterProps?: AdjusterProps;
    }
    export const component = decorate(style)<Props>(sheet => props => (
        <Adjuster
            {...props.adjusterProps}
            horizontal={props.horizontal}
            className={sheet.classes['button-container']}
        >
            {props.elements}
        </Adjuster>
    ));
}
export type ButtonContainerProps = InnerScope.Props;
export const ButtonContainer = InnerScope.component;
