import { Cbn } from '../../lib/shared/cbn';
import * as React from 'react';
import { Paper, withStyles, Theme, Typography } from 'material-ui';
import { AppStyle } from '../shared/app-style';
import { AppTypography, AppPaper } from '../components/material-ui/wrapper';
import { ThemeAction } from '../actions/shared/theme-action';

export namespace AppFotter {
    export const height = 40;
    export const styles = {
        footer: ThemeAction.action.getThemeObservable().map((theme: Theme) => {
            return {
                display: 'flex' as 'flex',
                'align-items': 'center' as 'center',
                'justify-content': 'center' as 'center',
                height: height,
                background: theme.palette.primary.main,
                color: theme.palette.primary.contrastText
            };
        })
    };
    export const component = AppStyle.decorate(styles)(styles => props => {
        return (
            <AppPaper.component className={styles.classes.footer} elevation={3}>
                <AppTypography.component color="inherit">
                    &copy; 2018 - cbn.es2017.sample
                </AppTypography.component>
            </AppPaper.component>
        );
    });
}
