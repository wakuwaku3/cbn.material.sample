import { Cbn } from '../../lib/shared/cbn';
import { connect } from 'undux';
import { StyleRules, StyleRulesCallback, WithStyles } from 'material-ui/styles';
import * as React from 'react';
import * as Undux from 'undux';
import { AuthAction } from '../actions/shared/auth-action';
import { BrowserAction } from '../actions/shared/browser-action';
import { MessagesAction } from '../actions/shared/messages-action';
import { HomeIndexAction } from '../actions/home/home-index-action';
import { Theme, createMuiTheme } from 'material-ui';
import { purple } from 'material-ui/colors';
import { StyleSheet } from 'jss';
import { HomeAboutAction } from '../actions/home/home-about-action';

export namespace App {
    let theme: Theme;
    export function getTheme() {
        if (!theme) {
            theme = createMuiTheme({
                palette: {
                    primary: purple,
                    type: 'dark'
                },
                typography: {
                    fontSize: 13
                }
            });
        }
        return theme;
    }
    export class Store {
        browser: BrowserAction.Model = this.getByLocalStorage('browser');
        auth: AuthAction.Model = this.getByLocalStorage('auth');
        messages: MessagesAction.Model = this.getByLocalStorage('messages');
        homeIndex: HomeIndexAction.Model = this.getNewValue('homeIndex');
        homeAbout: HomeAboutAction.Model = this.getNewValue('homeAbout');
        // productsIndex: ProductsIndex.Model = this.getNewValue('productsIndex');

        private getNewValue<Key extends keyof Store>(key: Key): Store[Key] {
            //return this.getByLocalStorage(key, k => null);
            return null;
        }
        private getByLocalStorage<Key extends keyof Store>(
            key: Key
        ): Store[Key] {
            let val = localStorage.getItem(key);
            if (val) {
                return JSON.parse(val);
            }
            return null;
        }
    }
    const store = Cbn.Undux.initializeStore(new Store(), {
        withLocalStorage: ['auth']
    });
    export abstract class PageAction<
        Key extends keyof Store,
        TEvent
    > extends Cbn.PageAction<Store, Key, TEvent> {
        constructor(key: Key) {
            super(key, store);
        }
    }
    export const withStore = connect(store);

    export const decorate = <T extends object>(
        styleFactory: Cbn.WithTheme<T>
    ) => {
        let style = styleFactory(getTheme());
        let sheet = Cbn.Jss.attachStyles(style);
        return <Props = {}>(
            generator: (
                sheet?: StyleSheet<T>,
                style?: T
            ) => React.ComponentType<Props>
        ) => {
            let component = generator(sheet, style);
            sheet.update(component.defaultProps);
            return component;
        };
    };
    export const decorateWithStore = <T extends object>(
        styleFactory: Cbn.WithTheme<T>,
        ...listenOn: (keyof Store)[]
    ) => {
        return <Props>(
            generator: (sheet: StyleSheet<T>) => React.ComponentType<Props>
        ) => {
            let component = decorate(styleFactory)(generator);
            return App.withStore(...listenOn)(() => {
                return React.createElement(component);
            });
        };
    };
}
