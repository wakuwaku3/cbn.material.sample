import * as React from 'react';
import { themeAction } from '../../actions/shared/theme-action';
import {
    getWarningColor,
    getInfoColor,
    getErrorColor
} from '../../models/shared/color';
import { Message } from '../../models/actions/shared/messages';
import { decorate } from '../../helper/app-style-helper';
import { AppTypography } from '../material-ui/wrapper';
import { InfoIcon, WarningIcon, ErrorIcon } from '../material-ui/icon-wrapper';

namespace InnerScope {
    interface Style {
        root;
        text;
        'info-icon';
        'warning-icon';
        'error-icon';
    }
    const style: Style = {
        root: {},
        text: {
            'word-wrap': 'break-word;',
            overflow: 'hidden'
        },
        'info-icon': themeAction
            .getThemeObservable()
            .map(theme => ({ color: getInfoColor(theme) })),
        'warning-icon': themeAction
            .getThemeObservable()
            .map(theme => ({ color: getWarningColor(theme) })),
        'error-icon': themeAction
            .getThemeObservable()
            .map(theme => ({ color: getErrorColor(theme) }))
    };
    export interface Props {
        message: Message;
    }
    export const component = decorate(style)<Props>(sheet => props => {
        return (
            <div className={sheet.classes.root}>
                <AppTypography
                    className={sheet.classes[props.message.level + '-icon']}
                >
                    {(() => {
                        switch (props.message.level) {
                            case 'info':
                                return <InfoIcon />;
                            case 'warning':
                                return <WarningIcon />;
                            case 'error':
                                return <ErrorIcon />;
                        }
                        return '';
                    })()}
                </AppTypography>
                <AppTypography variant="caption" className={sheet.classes.text}>
                    {props.message.text}
                </AppTypography>
            </div>
        );
    });
}
export const MessageField = InnerScope.component;
