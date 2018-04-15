import * as React from 'react';
import { Paper, withStyles, Theme, Typography } from 'material-ui';
import { AppTypography, AppPaper } from '../components/material-ui/wrapper';
import { themeAction } from '../actions/shared/theme-action';
import { decorate } from '../../lib/shared/style-helper';

namespace InnerScope {
    export const getHeight = () => 40;
    const styles = (theme: Theme) => ({
        footer: {
            display: 'flex' as 'flex',
            'align-items': 'center' as 'center',
            'justify-content': 'center' as 'center',
            height: getHeight(),
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
        }
    });
    export const component = decorate(styles)(props => {
        return (
            <AppPaper className={props.classes.footer} elevation={3}>
                <AppTypography color="inherit">
                    &copy; 2018 - cbn.es2017.sample
                </AppTypography>
            </AppPaper>
        );
    });
}
export const getFooterHeight = InnerScope.getHeight;
export const AppFooter = InnerScope.component;
