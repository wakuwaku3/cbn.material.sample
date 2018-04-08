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
    Switch,
    Grid,
    AppBar as MuiAppBar,
    Toolbar
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
import { GridProps } from 'material-ui/Grid';
import { AppBarProps as MuiAppBarProps } from 'material-ui/AppBar';
import { ToolbarProps } from 'material-ui/Toolbar';

export interface AppTextFieldProps extends TextFieldProps {}
export const AppTextField: React.SFC<AppTextFieldProps> = props => (
    <TextField margin="normal" {...props}>
        {props.children}
    </TextField>
);
export interface AppButtonProps extends ButtonProps {}
export const AppButton: React.SFC<AppButtonProps> = props => (
    <Button {...props}>{props.children}</Button>
);
export interface AppTypographyProps extends TypographyProps {}
export const AppTypography: React.SFC<AppTypographyProps> = props => (
    <Typography {...props}>{props.children}</Typography>
);
export interface AppPaperProps extends PaperProps {}
export const AppPaper: React.SFC<AppPaperProps> = props => (
    <Paper {...props}>{props.children}</Paper>
);
export interface AppIconButtonProps extends IconButtonProps {}
export const AppIconButton: React.SFC<AppIconButtonProps> = props => (
    <IconButton {...props}>{props.children}</IconButton>
);
export interface AppRadioGroupProps extends RadioGroupProps {}
export const AppRadioGroup: React.SFC<AppRadioGroupProps> = props => (
    <RadioGroup {...props}>{props.children}</RadioGroup>
);
export interface AppRadioProps extends RadioProps {}
export const AppRadio: React.SFC<AppRadioProps> = props => (
    <Radio {...props}>{props.children}</Radio>
);
export interface AppFormControlProps extends FormControlProps {}
export const AppFormControl: React.SFC<AppFormControlProps> = props => (
    <FormControl {...props}>{props.children}</FormControl>
);
export interface AppFormLabelProps extends FormLabelProps {}
export const AppFormLabel: React.SFC<AppFormLabelProps> = props => (
    <FormLabel {...props}>{props.children}</FormLabel>
);
export interface AppFormControlLabelProps extends FormControlLabelProps {}
export const AppFormControlLabel: React.SFC<
    AppFormControlLabelProps
> = props => <FormControlLabel {...props}>{props.children}</FormControlLabel>;
export interface AppSwitchProps extends SwitchProps {}
export const AppSwitch: React.SFC<AppSwitchProps> = props => (
    <Switch {...props}>{props.children}</Switch>
);
export interface AppGridProps extends GridProps {}
export const AppGrid: React.SFC<AppGridProps> = props => (
    <Grid {...props}>{props.children}</Grid>
);
export interface AppBarProps extends MuiAppBarProps {}
export const AppBar: React.SFC<AppBarProps> = props => (
    <MuiAppBar {...props}>{props.children}</MuiAppBar>
);
export interface AppToolbarProps extends ToolbarProps {}
export const AppToolbar: React.SFC<AppToolbarProps> = props => (
    <Toolbar {...props}>{props.children}</Toolbar>
);
