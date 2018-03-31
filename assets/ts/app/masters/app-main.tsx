import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app-router';
import * as React from 'react';
import { AppTop } from './app-top';
import { Cbn } from '../../lib/shared/cbn';
import {
    MuiThemeProvider,
    getMuiTheme,
    darkBaseTheme,
    lightBaseTheme,
    LightRawTheme
} from 'material-ui/styles';
import { AppFotter } from './app-footer';
import { App } from '../shared/app';
import * as $ from 'jquery';
import { AppBody } from './app-body';

export namespace AppMain {
    export const component = () => {
        const styles = {
            '@global': {
                body: { ...App.theme.paper }
            }
        };
        styles['@global'].body['margin'] = 0;
        const classes = Cbn.Jss.attachStyles(styles);
        return (
            <MuiThemeProvider muiTheme={App.theme}>
                <BrowserRouter>
                    <div>
                        <AppTop.component />
                        <AppBody.component />
                        <AppFotter.component />
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    };
}
