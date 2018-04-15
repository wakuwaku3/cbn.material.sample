import * as React from 'react';
import { themeAction } from '../../actions/shared/theme-action';
import Snackbar, { SnackBarOrigin } from 'material-ui/Snackbar';
import { MessageField } from './message-field';
import { AppIconButton } from '../material-ui/wrapper';
import { CloseIcon } from '../material-ui/icon-wrapper';
import { Message } from '../../actions/shared/messages-action';
import { decorate } from '../../../lib/shared/style-helper';
import { Theme } from 'material-ui';

namespace InnerScope {
    interface Style {
        root;
        content;
        'content-message';
        'content-action';
        'content-button';
        'close-icon';
    }
    const style = (theme: Theme): Style => ({
        root: {
            position: 'relative',
            [theme.breakpoints.up('md')]: {
                'margin-bottom': '5px'
            }
        },
        content: {
            color: theme.palette.text.primary,
            background: theme.palette.background.paper,
            display: 'flex',
            'flex-wrap': 'nowrap'
        },
        'content-message': {
            overflow: 'hidden'
        },
        'content-action': { 'padding-left': 0 },
        'content-button': {
            height: 'inherit'
        },
        'close-icon': {
            'font-size': theme.typography.title.fontSize
        }
    });
    export interface Props {
        onClose?: () => void;
        message: Message;
        anchorOrigin?: SnackBarOrigin;
    }
    export const component = decorate(style)<Props>(props => {
        return (
            <Snackbar
                className={props.classes.root}
                SnackbarContentProps={{
                    className: props.classes.content,
                    classes: {
                        message: props.classes['content-message'],
                        action: props.classes['content-action']
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
                        className={props.classes['content-button']}
                        onClick={props.onClose}
                    >
                        <CloseIcon className={props.classes['close-icon']} />
                    </AppIconButton>
                ]}
            />
        );
    });
}
export type MessageBarProps = InnerScope.Props;
export const MessageBar = InnerScope.component;
