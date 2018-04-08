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
import { CloseIcon } from '../components/material-ui/icon-wrapper';
import { themeAction } from '../actions/shared/theme-action';
import { decorateWithStore } from '../helper/app-style-helper';
import { messagesAction } from '../actions/shared/messages-action';

namespace InnerScope {
    const styles = {
        root: themeAction.getThemeObservable().map((theme: Theme) => ({
            color: theme.palette.error.contrastText,
            background: theme.palette.error[theme.palette.type]
        })),
        close: themeAction.getThemeObservable().map((theme: Theme) => ({
            width: theme.spacing.unit * 4,
            height: theme.spacing.unit * 4
        }))
    };
    export const component = decorateWithStore(styles, messagesAction.key)(
        sheet => props => (
            <div>
                <Snackbar
                    SnackbarContentProps={{ className: sheet.classes.root }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    open={messagesAction.model.isShow}
                    onClose={(e, r) => messagesAction.emit('handleClose', r)}
                    message={
                        <AppTypography id="message-id">
                            {messagesAction.model.errorMessage}
                        </AppTypography>
                    }
                    action={[
                        <AppIconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={sheet.classes.close}
                            onClick={e => messagesAction.emit('handleClose')}
                        >
                            <CloseIcon />
                        </AppIconButton>
                    ]}
                />
            </div>
        )
    );
}
export const AppMessages = InnerScope.component;
