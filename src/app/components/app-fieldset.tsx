import * as React from 'react';
import { ThemeAction } from '../actions/shared/theme-action';
import { AppStyle } from '../shared/app-style';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Theme
} from 'material-ui';
import { AppIcon } from './material-ui/icon-wrapper';
import { AppTypography } from './material-ui/wrapper';

export namespace AppFieldSet {
    export interface Props {
        defaultExpanded?: boolean;
        title: string;
    }
    const styles = {
        'summary-root': {
            'min-height': 'inherit'
        },
        'summary-content': {
            margin: [8, 0]
        },
        details: {
            'flex-direction': 'column'
        },
        header: ThemeAction.action.getThemeObservable().map((theme: Theme) => {
            return {
                background: theme.palette.primary.light,
                color: theme.palette.primary.contrastText
            };
        })
    };
    export const component = AppStyle.decorate(styles)<Props>(
        sheet => props => {
            return (
                <ExpansionPanel defaultExpanded={props.defaultExpanded}>
                    <ExpansionPanelSummary
                        expandIcon={<AppIcon.ExpandMoreIcon />}
                        className={sheet.classes.header}
                        classes={{
                            root: sheet.classes['summary-root'],
                            content: sheet.classes['summary-content']
                        }}
                    >
                        <AppTypography.component>
                            {props.title}
                        </AppTypography.component>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={sheet.classes.details}>
                        {props.children}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            );
        }
    );
    component.defaultProps = {
        defaultExpanded: true
    };
}
