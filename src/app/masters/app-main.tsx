import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app-router';
import * as React from 'react';
import { AppTop } from './app-top';
import { Cbn } from '../../lib/shared/cbn';
import { MuiThemeProvider } from 'material-ui/styles';
import { AppFotter } from './app-footer';
import { AppBody } from './app-body';
import { CssBaseline, createMuiTheme } from 'material-ui';
import { JssProvider, jss } from 'react-jss';
import { purple } from 'material-ui/colors';
import { ThemeAction } from '../actions/shared/theme-action';
import { AppStore } from '../actions/app-store';

export namespace AppMain {
    export const component = AppStore.withStore(ThemeAction.key)(() => {
        return (
            <JssProvider jss={jss}>
                <MuiThemeProvider theme={ThemeAction.action.theme}>
                    <React.Fragment>
                        <CssBaseline />
                        <BrowserRouter>
                            <div>
                                <AppTop.component />
                                <AppBody.component />
                                <AppFotter.component />
                            </div>
                        </BrowserRouter>
                    </React.Fragment>
                </MuiThemeProvider>
            </JssProvider>
        );
    });
}
