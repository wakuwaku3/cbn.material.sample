import * as React from 'react';
import { TextField, Button, Typography, Paper, IconButton } from 'material-ui';
import { TextFieldProps } from 'material-ui/TextField';
import { ButtonProps } from 'material-ui/Button';
import { TypographyProps } from 'material-ui/Typography';
import { PaperProps } from 'material-ui/Paper';
import { IconButtonProps } from 'material-ui/IconButton';

export namespace AppTextField {
    export const component: React.SFC<TextFieldProps> = props => (
        <TextField {...props}>{props.children}</TextField>
    );
}
export namespace AppButton {
    export const component: React.SFC<ButtonProps> = props => (
        <Button {...props}>{props.children}</Button>
    );
}
export namespace AppTypography {
    export const component: React.SFC<TypographyProps> = props => (
        <Typography {...props}>{props.children}</Typography>
    );
}
export namespace AppPaper {
    export const component: React.SFC<PaperProps> = props => (
        <Paper {...props}>{props.children}</Paper>
    );
}
export namespace AppIconButton {
    export const component: React.SFC<IconButtonProps> = props => (
        <IconButton {...props}>{props.children}</IconButton>
    );
}
