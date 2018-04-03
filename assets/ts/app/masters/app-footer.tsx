import { Cbn } from '../../lib/shared/cbn';
import * as React from 'react';
import { Paper, BottomNavigation, BottomNavigationItem } from 'material-ui';
import { App } from '../shared/app';

export namespace AppFotter {
    export const styles = {
        footer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 40
        }
    };
    const classes = Cbn.Jss.attachStyles(styles);
    export const component = () => {
        return (
            <Paper
                className={classes.footer}
                style={{
                    backgroundColor: App.getTheme().appBar.color,
                    color: App.getTheme().appBar.textColor
                }}
                zDepth={1}
            >
                &copy; 2018 - cbn.es2017.sample
            </Paper>
        );
    };
}
