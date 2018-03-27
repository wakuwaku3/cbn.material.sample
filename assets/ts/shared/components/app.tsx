import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app-router';
import * as React from 'react';
import { AppTop } from './app-top';
import { AppStyleHelper } from '../helpers/app-style-helper';

export namespace App {
    const styles = {
        app: {
            background: '#f7df1e'
        }
    };
    const classes = AppStyleHelper.attachStyles(styles);
    export const Component: React.SFC = () => {
        return (
            <BrowserRouter>
                <div className={classes.app}>
                    <AppTop.Component />
                    <div className="container body-content">
                        <AppRouter.Component />
                    </div>
                    <footer className="footer">
                        <div className="container">
                            <span className="text-muted">
                                &copy; 2018 - cbn.es2017.sample
                            </span>
                        </div>
                    </footer>
                </div>
            </BrowserRouter>
        );
    };
}
