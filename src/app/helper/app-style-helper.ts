import { Cbn } from '../../lib/shared/cbn';
import * as React from 'react';
import { StyleSheet } from 'jss';
import { WithStyles } from 'material-ui';
import injectSheet from 'react-jss';
import { AppStore } from '../models/actions/shared/app-store';
import { withStore } from './app-store-helper';

export const decorateWithProps = <T extends object>(style: T) => {
    return <Props = {}>(component: React.ComponentType<Props & WithStyles<keyof T>>): React.ComponentType<Props> =>
        injectSheet(style)(component);
};
export const decorate = <T extends object>(style: T) => {
    return <Props = {}>(generator: (sheet?: StyleSheet<T>) => React.ComponentType<Props>) => {
        let sheet = Cbn.Jss.attachStyles(style);
        let component = generator(sheet);
        sheet.update(component.defaultProps);
        return component;
    };
};
export const decorateWithStore = <T extends object>(style: T, ...listenOn: (keyof AppStore)[]) => {
    return <Props>(generator: (sheet: StyleSheet<T>) => React.ComponentType<Props>) => {
        let component = decorate(style)(generator);
        return withStore(...listenOn)<Props>(props => {
            return React.createElement(component, props, props.children);
        });
    };
};
