import * as React from 'react';
import {
    TextField,
    Button,
    Typography,
    Paper,
    IconButton,
    RadioGroup,
    Radio,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    FormControl,
    FormLabel,
    FormControlLabel,
    Switch
} from 'material-ui';
import { TextFieldProps } from 'material-ui/TextField';
import { ButtonProps } from 'material-ui/Button';
import { TypographyProps } from 'material-ui/Typography';
import { PaperProps } from 'material-ui/Paper';
import { IconButtonProps } from 'material-ui/IconButton';
import { RadioGroupProps, RadioProps } from 'material-ui/Radio';
import {
    ExpansionPanelProps,
    ExpansionPanelSummaryProps,
    ExpansionPanelDetailsProps
} from 'material-ui/ExpansionPanel';
import {
    FormControlProps,
    FormLabelProps,
    FormControlLabelProps
} from 'material-ui/Form';
import { SwitchProps } from 'material-ui/Switch';

export namespace AppTextField {
    export interface Props extends TextFieldProps {}
    export const component: React.SFC<Props> = props => (
        <TextField {...props}>{props.children}</TextField>
    );
}
export namespace AppButton {
    export interface Props extends ButtonProps {}
    export const component: React.SFC<Props> = props => (
        <Button {...props}>{props.children}</Button>
    );
}
export namespace AppTypography {
    export interface Props extends TypographyProps {}
    export const component: React.SFC<Props> = props => (
        <Typography {...props}>{props.children}</Typography>
    );
}
export namespace AppPaper {
    export interface Props extends PaperProps {}
    export const component: React.SFC<Props> = props => (
        <Paper {...props}>{props.children}</Paper>
    );
}
export namespace AppIconButton {
    export interface Props extends IconButtonProps {}
    export const component: React.SFC<Props> = props => (
        <IconButton {...props}>{props.children}</IconButton>
    );
}
export namespace AppRadioGroup {
    export interface Props extends RadioGroupProps {}
    export const component: React.SFC<Props> = props => (
        <RadioGroup {...props}>{props.children}</RadioGroup>
    );
}
export namespace AppRadio {
    export interface Props extends RadioProps {}
    export const component: React.SFC<Props> = props => (
        <Radio {...props}>{props.children}</Radio>
    );
}
export namespace AppFormControl {
    export interface Props extends FormControlProps {}
    export const component: React.SFC<Props> = props => (
        <FormControl {...props}>{props.children}</FormControl>
    );
}
export namespace AppFormLabel {
    export interface Props extends FormLabelProps {}
    export const component: React.SFC<Props> = props => (
        <FormLabel {...props}>{props.children}</FormLabel>
    );
}
export namespace AppFormControlLabel {
    export interface Props extends FormControlLabelProps {}
    export const component: React.SFC<Props> = props => (
        <FormControlLabel {...props}>{props.children}</FormControlLabel>
    );
}
export namespace AppSwitch {
    export interface Props extends SwitchProps {}
    export const component: React.SFC<Props> = props => (
        <Switch {...props}>{props.children}</Switch>
    );
}
