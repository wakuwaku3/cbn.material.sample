import * as React from 'react';
import { Cbn } from '../../lib/shared/cbn';
import { AppRouter } from './app-router';
import { AppFotter } from './app-footer';
import { App } from '../shared/app';
import {
    withStyles,
    Theme,
    WithStyles,
    StyleRulesCallback,
    Button
} from 'material-ui';
import { AppTop } from './app-top';
import { StyleRules } from 'material-ui/styles';
import { Store } from 'undux';
import { LogIn } from '../components/login';
import { BrowserAction } from '../actions/shared/browser-action';
import { AuthAction } from '../actions/shared/auth-action';
import { AppMessages } from './app-messages';

export namespace AppBody {
    const styles = (theme: Theme) => {
        let pt = 10;
        let pb = 10;
        let style = {
            body: {
                paddingTop: pt,
                paddingBottom: pb,
                paddingLeft: 10,
                paddingRight: 10,
                overflow: 'auto' as 'auto',
                height: Cbn.Observable.fromEvent(
                    BrowserAction.action.emitter,
                    'resize'
                )
                    .map(() => '')
                    .startWith('')
                    .map(() => {
                        let top = AppTop.getHeight();
                        return window.innerHeight - AppFotter.height - top;
                    })
            }
        };
        return style;
    };
    export const component = App.decorateWithStore(
        styles,
        BrowserAction.key,
        AuthAction.key
    )(sheet => props => {
        return (
            <div className={sheet.classes.body}>
                <AppMessages.component />
                {(() => {
                    if (AuthAction.action.model.authenticated) {
                        return <AppRouter.component />;
                    } else {
                        return (
                            <LogIn.component
                                onLogIn={args =>
                                    AuthAction.action.emitter.emit(
                                        'login',
                                        args
                                    )
                                }
                            />
                        );
                    }
                })()}
            </div>
        );
    });
}