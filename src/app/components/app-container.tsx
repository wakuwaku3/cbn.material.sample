import { Cbn } from '../../lib/shared/cbn';
import * as React from 'react';
import { AppStyle } from '../shared/app-style';

export namespace AppContainer {
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
    export const styles = {
        container: (props: Props) => {
            let style = {
                'align-items': convertVertical(props),
                height: '100%',
                width: '100%',
                display: 'flex' as 'flex',
                'justify-content': convertHorizontal(props)
            };
            return style;
        }
    };
    export const component = AppStyle.decorate(styles)(
        sheet => (props: Props) => {
            sheet.update(props);
            let merged = Cbn.mergeClassNeme(props, sheet.classes.container);
            return <div {...merged}>{props.children}</div>;
        }
    );
}
