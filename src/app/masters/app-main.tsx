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
import { AppBody } from './app-body';

export namespace AppMain {
    const styles = {
        '@global': {
            body: { ...App.getTheme().paper }
        }
    };
    styles['@global'].body['margin'] = 0;
    const classes = Cbn.Jss.attachStyles(styles);
    export const component = () => {
        return (
            <MuiThemeProvider muiTheme={App.getTheme()}>
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
