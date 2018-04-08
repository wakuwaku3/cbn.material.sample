import { AppStyle } from '../shared/app-style';
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
import {
    AppIconButton,
    AppTypography
} from '../components/material-ui/wrapper';
import { ThemeAction } from '../actions/shared/theme-action';
import { AppIcon } from '../components/material-ui/icon-wrapper';

export namespace AppMessages {
    const styles = {
        root: ThemeAction.action.getThemeObservable().map((theme: Theme) => ({
            color: theme.palette.error.contrastText,
            background: theme.palette.error[theme.palette.type]
        })),
        close: ThemeAction.action.getThemeObservable().map((theme: Theme) => ({
            width: theme.spacing.unit * 4,
            height: theme.spacing.unit * 4
        }))
    };
    export const component = AppStyle.decorateWithStore(
        styles,
        MessagesAction.key
    )(sheet => props => (
        <div>
            <Snackbar
                SnackbarContentProps={{ className: sheet.classes.root }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                open={MessagesAction.action.model.isShow}
                onClose={(e, r) =>
                    MessagesAction.action.emitter.emit('handleClose', r)
                }
                message={
                    <AppTypography.component id="message-id">
                        {MessagesAction.action.model.errorMessage}
                    </AppTypography.component>
                }
                action={[
                    <AppIconButton.component
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={sheet.classes.close}
                        onClick={e =>
                            MessagesAction.action.emitter.emit('handleClose')
                        }
                    >
                        <AppIcon.CloseIcon />
                    </AppIconButton.component>
                ]}
            />
        </div>
    ));
}
