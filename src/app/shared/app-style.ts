import { Cbn } from '../../lib/shared/cbn';
import { ThemeAction } from '../actions/shared/theme-action';
import { AppStore } from '../actions/app-store';
import * as React from 'react';
import { StyleSheet } from 'jss';
import { WithStyles } from 'material-ui';
import injectSheet from 'react-jss';

export namespace AppStyle {
    export const decorateWithProps = <T extends object>(style: T) => {
        return <Props = {}>(
            component: React.ComponentType<Props & WithStyles<keyof T>>
        ): React.ComponentType<Props> => injectSheet(style)(component);
    };
    export const decorate = <T extends object>(style: T) => {
        return <Props = {}>(
            generator: (sheet?: StyleSheet<T>) => React.ComponentType<Props>
        ) => {
            let sheet = Cbn.Jss.attachStyles(style);
            let component = generator(sheet);
            sheet.update(component.defaultProps);
            return component;
        };
    };
    export const decorateWithStore = <T extends object>(
        style: T,
        ...listenOn: (keyof AppStore.Model)[]
    ) => {
        return <Props>(
            generator: (sheet: StyleSheet<T>) => React.ComponentType<Props>
        ) => {
            let component = decorate(style)(generator);
            return AppStore.withStore(...listenOn)(() => {
                return React.createElement(component);
            });
        };
    };
}
