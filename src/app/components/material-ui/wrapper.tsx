import * as React from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabel,
  Switch,
  Grid,
  AppBar as MuiAppBar,
  Toolbar,
  Menu,
  Divider,
  MenuItem,
  TableRow,
  Tooltip,
  Select,
  Input,
  InputLabel,
  Checkbox,
} from 'material-ui';
import { TextFieldProps } from 'material-ui/TextField';
import { ButtonProps } from 'material-ui/Button';
import { TypographyProps } from 'material-ui/Typography';
import { PaperProps } from 'material-ui/Paper';
import { IconButtonProps } from 'material-ui/IconButton';
import { RadioGroupProps, RadioProps } from 'material-ui/Radio';
import {
  FormControlProps,
  FormLabelProps,
  FormControlLabelProps,
} from 'material-ui/Form';
import { SwitchProps } from 'material-ui/Switch';
import { GridProps } from 'material-ui/Grid';
import { AppBarProps as MuiAppBarProps } from 'material-ui/AppBar';
import { ToolbarProps } from 'material-ui/Toolbar';
import { MenuProps, MenuItemProps } from 'material-ui/Menu';
import { DividerProps } from 'material-ui/Divider';
import { TableRowProps } from 'material-ui/Table';
import { TooltipProps } from 'material-ui/Tooltip';
import { SelectProps } from 'material-ui/Select';
import { InputProps, InputLabelProps } from 'material-ui/Input';
import { CheckboxProps } from 'material-ui/Checkbox';
import { decorate } from '../../../lib/shared/style-helper';
import Card, {
  CardProps,
  CardHeaderProps,
  CardHeader,
  CardMediaProps,
  CardMedia,
  CardContentProps,
  CardContent,
} from 'material-ui/Card';

export interface AppTextFieldProps extends TextFieldProps {}
export const AppTextField: React.SFC<AppTextFieldProps> = props => (
  <TextField {...props}>{props.children}</TextField>
);
AppTextField.defaultProps = {
  margin: 'normal',
  fullWidth: true,
};
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
const gridStyle = {
  typeItem: {
    padding: [0, 8],
  },
};
export const AppGrid = decorate(gridStyle)<AppGridProps>(props => {
  const p = Object.assign({}, props);
  const classNames = [];
  if (p.item && props.classes.typeItem) {
    classNames.push(props.classes.typeItem);
  }
  if (props.className) {
    classNames.push(props.className);
  }
  if (p.item && !p.xs) {
    p.xs = 12;
  }
  return (
    <Grid {...p} className={classNames.join(' ')}>
      {props.children}
    </Grid>
  );
});
export interface AppBarProps extends MuiAppBarProps {}
export const AppBar: React.SFC<AppBarProps> = props => (
  <MuiAppBar {...props}>{props.children}</MuiAppBar>
);
export interface AppToolbarProps extends ToolbarProps {}
export const AppToolbar: React.SFC<AppToolbarProps> = props => (
  <Toolbar {...props}>{props.children}</Toolbar>
);
export interface AppMenuProps extends MenuProps {}
export const AppMenu: React.SFC<AppMenuProps> = props => (
  <Menu {...props}>{props.children}</Menu>
);
export interface AppMenuItemProps extends MenuItemProps {}
export class AppMenuItem extends React.Component<AppMenuItemProps> {
  public render() {
    return <MenuItem {...this.props}>{this.props.children}</MenuItem>;
  }
}
export interface AppDividerProps extends DividerProps {}
export const AppDivider: React.SFC<AppDividerProps> = props => (
  <Divider {...props}>{props.children}</Divider>
);
export interface AppTooltipProps extends TooltipProps {}
export const AppTooltip: React.SFC<AppTooltipProps> = props => (
  <Tooltip {...props}>{props.children}</Tooltip>
);
export interface AppSelectProps extends SelectProps {}
export const AppSelect: React.SFC<AppSelectProps> = props => (
  <Select {...props}>{props.children}</Select>
);
AppSelect.defaultProps = {
  autoWidth: true,
};
export interface AppInputProps extends InputProps {}
export const AppInput: React.SFC<AppInputProps> = props => (
  <Input {...props}>{props.children}</Input>
);
export interface AppInputLabelProps extends InputLabelProps {}
export const AppInputLabel: React.SFC<AppInputLabelProps> = props => (
  <InputLabel {...props}>{props.children}</InputLabel>
);
export interface AppCheckboxProps extends CheckboxProps {}
export const AppCheckbox: React.SFC<AppCheckboxProps> = props => (
  <Checkbox {...props}>{props.children}</Checkbox>
);
export interface AppTableRowProps extends TableRowProps {}
export const AppTableRow: React.SFC<AppTableRowProps> = props => (
  <TableRow {...props}>{props.children}</TableRow>
);
export interface AppCardProps extends CardProps {}
export const AppCard: React.SFC<AppCardProps> = props => (
  <Card {...props}>{props.children}</Card>
);
export interface AppCardHeaderProps extends CardHeaderProps {}
export const AppCardHeader: React.SFC<AppCardHeaderProps> = props => (
  <CardHeader {...props}>{props.children}</CardHeader>
);
export interface AppCardMediaProps extends CardMediaProps {}
export const AppCardMedia: React.SFC<AppCardMediaProps> = props => (
  <CardMedia {...props}>{props.children}</CardMedia>
);
export interface AppCardContentProps extends CardContentProps {}
export const AppCardContent: React.SFC<AppCardContentProps> = props => (
  <CardContent {...props}>{props.children}</CardContent>
);
