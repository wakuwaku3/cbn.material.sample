import * as React from 'react';
import { themeAction } from '../../actions/shared/theme-action';
import { Message } from '../../models/actions/shared/messages';
import Snackbar, { SnackBarOrigin } from 'material-ui/Snackbar';
import { decorate } from '../../helper/app-style-helper';
import { MessageField } from './message-field';
import { AppIconButton } from '../material-ui/wrapper';
import { CloseIcon } from '../material-ui/icon-wrapper';

namespace InnerScope {
    interface Style {
        root;
        content;
        'content-message';
        'content-action';
        'content-button';
        'close-icon';
    }
    const style: Style = {
        root: themeAction.getThemeObservable().map(theme => ({
            position: 'relative',
            [theme.breakpoints.up('md')]: {
                'margin-bottom': '5px'
            }
        })),
        content: themeAction.getThemeObservable().map(theme => ({
            color: theme.palette.text.primary,
            background: theme.palette.background.paper,
            display: 'flex',
            'flex-wrap': 'nowrap'
        })),
        'content-message': {
            overflow: 'hidden'
        },
        'content-action': { 'padding-left': 0 },
        'content-button': {
            height: 'inherit'
        },
        'close-icon': themeAction.getThemeObservable().map(theme => ({
            'font-size': theme.typography.title.fontSize
        }))
    };
    export interface Props {
        onClose?: () => void;
        message: Message;
        anchorOrigin?: SnackBarOrigin;
    }
    export const component = decorate(style)<Props>(sheet => props => {
        return (
            <Snackbar
                className={sheet.classes.root}
                SnackbarContentProps={{
                    className: sheet.classes.content,
                    classes: {
                        message: sheet.classes['content-message'],
                        action: sheet.classes['content-action']
                    }
                }}
                anchorOrigin={props.anchorOrigin}
                open={true}
                onClose={(event, reason) => {
                    // if (reason !== 'clickaway' && props.onClose)
                    //     props.onClose();
                    if (props.onClose) props.onClose();
                }}
                message={<MessageField message={props.message} />}
                action={[
                    <AppIconButton
                        key="close"
                        color="inherit"
                        disableRipple
                        className={sheet.classes['content-button']}
                        onClick={props.onClose}
                    >
                        <CloseIcon className={sheet.classes['close-icon']} />
                    </AppIconButton>
                ]}
            />
        );
    });
}
export type MessageBarProps = InnerScope.Props;
export const MessageBar = InnerScope.component;
