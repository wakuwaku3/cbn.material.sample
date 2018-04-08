import { Cbn } from '../../lib/shared/cbn';
import * as React from 'react';
import { Paper, withStyles, Theme, Typography } from 'material-ui';
import { AppTypography, AppPaper } from '../components/material-ui/wrapper';
import { decorate } from '../helper/app-style-helper';
import { themeAction } from '../actions/shared/theme-action';

namespace InnerScope {
    export const getHeight = () => 40;
    const styles = {
        footer: themeAction.getThemeObservable().map((theme: Theme) => {
            return {
                display: 'flex' as 'flex',
                'align-items': 'center' as 'center',
                'justify-content': 'center' as 'center',
                height: getHeight(),
                background: theme.palette.primary.main,
                color: theme.palette.primary.contrastText
            };
        })
    };
    export const component = decorate(styles)(styles => props => {
        return (
            <AppPaper className={styles.classes.footer} elevation={3}>
                <AppTypography color="inherit">
                    &copy; 2018 - cbn.es2017.sample
                </AppTypography>
            </AppPaper>
        );
    });
}
export const getFooterHeight = InnerScope.getHeight;
export const AppFooter = InnerScope.component;
