import { App } from '../shared/app';
import { MessagesAction } from '../actions/shared/messages-action';
import {
    Typography,
    WithStyles,
    Snackbar,
    Button,
    IconButton,
    Theme
} from 'material-ui';
import * as React from 'react';
import { Note, Close } from 'material-ui-icons';

export namespace AppMessages {
    const styles = (theme: Theme) => ({
        root: {
            color: theme.palette.error.contrastText,
            background: theme.palette.error[theme.palette.type]
        },
        close: {
            width: theme.spacing.unit * 4,
            height: theme.spacing.unit * 4
        }
    });
    export const component = App.decorateWithStore(styles, MessagesAction.key)(
        sheet => props => (
            <Snackbar
                SnackbarContentProps={{ className: sheet.classes.root }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                open={MessagesAction.action.model.isShow}
                autoHideDuration={6000}
                onClose={(e, r) =>
                    MessagesAction.action.emitter.emit('handleClose', r)
                }
                message={
                    <Typography id="message-id">
                        {MessagesAction.action.model.errorMessage}
                    </Typography>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={sheet.classes.close}
                        onClick={e =>
                            MessagesAction.action.emitter.emit('handleClose')
                        }
                    >
                        <Close />
                    </IconButton>
                ]}
            />
        )
    );
}
