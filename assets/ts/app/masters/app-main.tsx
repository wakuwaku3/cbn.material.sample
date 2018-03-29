import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app-router';
import * as React from 'react';
import { AppTop } from './app-top';
import { Cbn } from '../../lib/shared/cbn';

export namespace AppMain {
    const styles = {
        app: {
            background: '#f7df1e'
        }
    };
    const classes = Cbn.Jss.attachStyles(styles);
    export const component: React.SFC = () => {
        return (
            <BrowserRouter>
                <div className={classes.app}>
                    <AppTop.component />
                    <div className="container body-content">
                        <AppRouter.component />
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
