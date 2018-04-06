import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app-router';
import * as React from 'react';
import { AppTop } from './app-top';
import { Cbn } from '../../lib/shared/cbn';
import { MuiThemeProvider } from 'material-ui/styles';
import { AppFotter } from './app-footer';
import { App } from '../shared/app';
import { AppBody } from './app-body';
import { CssBaseline, createMuiTheme } from 'material-ui';
import { JssProvider, jss } from 'react-jss';
import { purple } from 'material-ui/colors';

export namespace AppMain {
    export const component = () => {
        return (
            <JssProvider jss={jss}>
                <MuiThemeProvider theme={App.getTheme()}>
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
    };
}
