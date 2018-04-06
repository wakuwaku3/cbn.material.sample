import { Cbn } from '../../lib/shared/cbn';
import * as React from 'react';
import { Paper, withStyles, Theme, Typography } from 'material-ui';
import { App } from '../shared/app';
import { AppTypography, AppPaper } from '../components/material-ui/wrapper';

export namespace AppFotter {
    export const height = 40;
    export const styles = (theme: Theme) => {
        return {
            footer: {
                display: 'flex' as 'flex',
                alignItems: 'center' as 'center',
                justifyContent: 'center' as 'center',
                height: height,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText
            }
        };
    };
    export const component = App.decorate(styles)(sheet => props => {
        return (
            <AppPaper.component className={sheet.classes.footer} elevation={3}>
                <AppTypography.component>
                    &copy; 2018 - cbn.es2017.sample
                </AppTypography.component>
            </AppPaper.component>
        );
    });
}
