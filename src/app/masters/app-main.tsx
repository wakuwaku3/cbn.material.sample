import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app-router';
import * as React from 'react';
import { AppTop } from './app-top';
import { Cbn } from '../../lib/shared/cbn';
import { MuiThemeProvider } from 'material-ui/styles';
import { AppFooter } from './app-footer';
import { AppBody } from './app-body';
import { CssBaseline, createMuiTheme } from 'material-ui';
import { JssProvider, jss } from 'react-jss';
import { purple } from 'material-ui/colors';
import { themeAction } from '../actions/shared/theme-action';
import { withStore } from '../helper/app-store-helper';

namespace InnerScope {
    export const component = withStore(themeAction.key)(() => {
        return (
            <JssProvider jss={jss}>
                <MuiThemeProvider theme={themeAction.theme}>
                    <React.Fragment>
                        <CssBaseline />
                        <BrowserRouter>
                            <div>
                                <AppTop />
                                <AppBody />
                                <AppFooter />
                            </div>
                        </BrowserRouter>
                    </React.Fragment>
                </MuiThemeProvider>
            </JssProvider>
        );
    });
}
export const AppMain = InnerScope.component;
