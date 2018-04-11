import * as React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Theme } from 'material-ui';
import { themeAction } from '../../actions/shared/theme-action';
import { decorate } from '../../helper/app-style-helper';
import { ExpandMoreIcon } from '../material-ui/icon-wrapper';
import { AppTypography } from '../material-ui/wrapper';

namespace InnerScope {
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
        header: themeAction.getThemeObservable().map((theme: Theme) => {
            return {
                background: theme.palette.secondary[theme.palette.type],
                '& p': {
                    color: theme.palette.secondary.contrastText
                }
            };
        })
    };
    export const component = decorate(styles)<Props>(sheet => props => {
        return (
            <ExpansionPanel defaultExpanded={props.defaultExpanded}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    className={sheet.classes.header}
                    classes={{
                        root: sheet.classes['summary-root'],
                        content: sheet.classes['summary-content']
                    }}
                >
                    <AppTypography>{props.title}</AppTypography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={sheet.classes.details}>{props.children}</ExpansionPanelDetails>
            </ExpansionPanel>
        );
    });
    component.defaultProps = {
        defaultExpanded: true
    };
}
export type FieldSetProps = InnerScope.Props;
export const FieldSet = InnerScope.component;
