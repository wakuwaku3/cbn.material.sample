import * as React from 'react';
import { Cbn } from '../../lib/shared/cbn';
import { AppRouter } from './app-router';
import {
    withStyles,
    WithStyles,
    StyleRulesCallback,
    Button
} from 'material-ui';
import { AppTop, getTopHeight } from './app-top';
import { StyleRules } from 'material-ui/styles';
import { Store } from 'undux';
import { LogIn } from '../pages/home/components/login';
import { getFooterHeight } from './app-footer';
import { AppMessages } from './app-messages';
import { authAction } from '../actions/shared/auth-action';
import { browserAction } from '../actions/shared/browser-action';
import { decorateWithStore } from '../helper/app-style-helper';

namespace InnerScope {
    let pt = 10;
    let pb = 10;
    const styles = {
        body: {
            paddingTop: pt,
            paddingBottom: pb,
            paddingLeft: 10,
            paddingRight: 10,
            overflow: 'auto' as 'auto',
            height: Cbn.Observable.fromEvent(browserAction.emitter, 'resize')
                .map(() => '')
                .startWith('')
                .map(() => {
                    let top = getTopHeight();
                    return window.innerHeight - getFooterHeight() - top;
                })
        }
    };
    export const component = decorateWithStore(
        styles,
        browserAction.key,
        authAction.key
    )(sheet => props => {
        return (
            <div className={sheet.classes.body}>
                <AppMessages />
                {(() => {
                    if (authAction.model.authenticated) {
                        return <AppRouter />;
                    } else {
                        return (
                            <LogIn
                                onLogIn={args => authAction.emit('login', args)}
                            />
                        );
                    }
                })()}
            </div>
        );
    });
}
export const AppBody = InnerScope.component;
