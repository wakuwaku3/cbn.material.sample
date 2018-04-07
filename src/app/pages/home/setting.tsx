import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    FormControl,
    FormLabel,
    Color as MuiColor,
    Theme
} from 'material-ui';
import { AppStyle } from '../../shared/app-style';
import * as React from 'react';
import { AppForm } from '../../components/app-form';
import {
    AppTypography,
    AppRadioGroup,
    AppFormControl,
    AppFormLabel,
    AppFormControlLabel,
    AppRadio,
    AppSwitch,
    AppTextField
} from '../../components/material-ui/wrapper';
import { ExpandMore } from 'material-ui-icons';
import { ThemeAction } from '../../actions/shared/theme-action';
import { RadioGroupProps, RadioProps } from 'material-ui/Radio';
import { FormControlLabelProps } from 'material-ui/Form';
import * as colors from 'material-ui/colors';
import { getColors, Color, convertToMuiColor } from '../../shared/models/color';
import { MessagesAction } from '../../actions/shared/messages-action';

export namespace AppRadioFormGroup {
    export interface Props {
        title: string;
        radioGroupProps?: RadioGroupProps;
        items: ItemProps[];
        onChange?: (event?: React.ChangeEvent<{}>, value?: string) => void;
        value?: string;
    }
    export interface ItemProps {
        label: string;
        value: string;
        labelProps?: Partial<FormControlLabelProps>;
        radioProps?: RadioProps;
    }
    export interface State {
        value: string;
    }
    export class component extends React.Component<Props, State> {
        constructor(props: Props) {
            super(props);
            this.state = { value: props.value ? props.value : '' };
        }
        private handleChange = (e, v) => {
            this.setState({ value: v });
            this.props.onChange(e, v);
        };
        render() {
            return (
                <AppFormControl.component component="fieldset">
                    <AppFormLabel.component>
                        {this.props.title}
                    </AppFormLabel.component>
                    <AppRadioGroup.component
                        row={true}
                        {...this.props.radioGroupProps}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        {this.props.items.map((item, i) => (
                            <AppFormControlLabel.component
                                key={i}
                                {...item.labelProps}
                                label={item.label}
                                value={item.value}
                                control={
                                    <AppRadio.component {...item.radioProps} />
                                }
                            />
                        ))}
                    </AppRadioGroup.component>
                </AppFormControl.component>
            );
        }
    }
}
export namespace ColorPalette {
    export const getItems = (classes: object) =>
        getColors().map(item => {
            return {
                label: item.name,
                value: item.name,
                labelProps: {
                    classes: {
                        label: classes[item.name]
                    }
                },
                radioProps: {
                    classes: {
                        checked: classes[item.name]
                    }
                }
            };
        });
    const style = (() => {
        let obj = {};
        getColors().forEach(item => {
            obj[item.name] = {
                color: item.color['500']
            };
        });
        return obj;
    })();
    export interface Props {
        title: string;
        value?: Color;
        onChange?: (event?: React.ChangeEvent<{}>, value?: Color) => void;
    }

    export const component = AppStyle.decorate(style)<Props>(sheet => props => {
        let handleChange = (e, v: string) => {
            let color = Color[v];
            if (!convertToMuiColor(color)) {
                color = Color[color.toString()];
            }
            props.onChange(e, color);
        };
        return (
            <AppRadioFormGroup.component
                title={props.title}
                value={props.value.toString()}
                onChange={handleChange}
                items={getItems(sheet.classes)}
            />
        );
    });
}
export namespace HomeSetting {
    const styles = {
        details: {
            'flex-direction': 'column'
        },
        header: ThemeAction.action.getThemeObservable().map((theme: Theme) => {
            return {
                background: theme.palette.primary.light,
                color: theme.palette.primary.contrastText
            };
        })
    };
    export const component = AppStyle.decorate(styles)(sheet => props => {
        return (
            <AppForm.component>
                <AppTypography.component variant="headline">
                    設定
                </AppTypography.component>
                <ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        className={sheet.classes.header}
                    >
                        <AppTypography.component>
                            表示テーマ
                        </AppTypography.component>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={sheet.classes.details}>
                        <ColorPalette.component
                            title="メインカラー"
                            value={ThemeAction.action.model.args.primary}
                            onChange={(e, v) =>
                                ThemeAction.action.emitter.emit('changeTheme', {
                                    primary: v
                                })
                            }
                        />
                        <ColorPalette.component
                            title="サブカラー"
                            value={ThemeAction.action.model.args.secondary}
                            onChange={(e, v) =>
                                ThemeAction.action.emitter.emit('changeTheme', {
                                    secondary: v
                                })
                            }
                        />
                        <ColorPalette.component
                            title="エラーカラー"
                            value={ThemeAction.action.model.args.error}
                            onChange={(e, v) => {
                                ThemeAction.action.emitter.emit('changeTheme', {
                                    error: v
                                });
                                MessagesAction.action.emitter.emit(
                                    'handleOpen',
                                    {
                                        errorMessage:
                                            'エラーカラーを変更しました。'
                                    }
                                );
                            }}
                        />
                        <AppFormControlLabel.component
                            control={
                                <AppSwitch.component
                                    checked={
                                        ThemeAction.action.model.args.type ===
                                        'dark'
                                    }
                                    onChange={(e, v) =>
                                        ThemeAction.action.emitter.emit(
                                            'changeTheme',
                                            {
                                                type: v ? 'dark' : 'light'
                                            }
                                        )
                                    }
                                />
                            }
                            label="ダークテーマを使用する"
                        />
                        <AppTextField.component
                            label="Number"
                            value={ThemeAction.action.model.args.fontSize}
                            onChange={e => {
                                ThemeAction.action.emitter.emit('changeTheme', {
                                    fontSize: Number(e.target.value)
                                });
                            }}
                            type="number"
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </AppForm.component>
        );
    });
}
