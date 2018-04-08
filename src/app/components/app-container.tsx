import { Cbn } from '../../lib/shared/cbn';
import * as React from 'react';
import { decorateWithProps } from '../helper/app-style-helper';

namespace InnerScope {
    export interface Props
        extends StyledArgs,
            React.DetailedHTMLProps<
                React.FormHTMLAttributes<HTMLDivElement>,
                HTMLDivElement
            > {}

    type vertical = 'top' | 'center' | 'bottom';
    type horizontal = 'left' | 'center' | 'right';
    type flexPosition = 'flex-start' | 'center' | 'flex-end';
    interface StyledArgs {
        vertical?: vertical;
        horizontal?: horizontal;
        height?: string | number;
        width?: string | number;
    }
    const convertVertical = (args: StyledArgs): flexPosition => {
        if (!args || !args.vertical) {
            return 'flex-start';
        }
        switch (args.vertical) {
            case 'top':
                return 'flex-start';
            case 'center':
                return 'center';
            case 'bottom':
                return 'flex-end';
        }
    };
    const convertHorizontal = (args: StyledArgs): flexPosition => {
        if (!args || !args.horizontal) {
            return 'flex-start';
        }
        switch (args.horizontal) {
            case 'left':
                return 'flex-start';
            case 'center':
                return 'center';
            case 'right':
                return 'flex-end';
        }
    };
    const styles = {
        container: (props: Props) => {
            let style = {
                'align-items': convertVertical(props),
                height: props && props.height ? props.height : '100%',
                width: props && props.width ? props.width : '100%',
                display: 'flex' as 'flex',
                'justify-content': convertHorizontal(props)
            };
            return style;
        }
    };
    export const component = decorateWithProps(styles)<Props>(props => {
        let merged = Cbn.mergeClassNeme(props, props.classes.container);
        return <div {...merged}>{props.children}</div>;
    });
}
export type AppContainerProps = InnerScope.Props;
export const AppContainer = InnerScope.component;
