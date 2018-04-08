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
    AppTextField,
    AppPaper,
    AppGrid,
    AppButton
} from '../../components/material-ui/wrapper';
import { ExpandMore } from 'material-ui-icons';
import { ThemeAction } from '../../actions/shared/theme-action';
import { RadioGroupProps, RadioProps } from 'material-ui/Radio';
import { FormControlLabelProps } from 'material-ui/Form';
import * as colors from 'material-ui/colors';
import { getColors, Color, convertToMuiColor } from '../../shared/models/color';
import { MessagesAction } from '../../actions/shared/messages-action';
import { AppContainer } from '../../components/app-container';

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
    const style = {
        'form-control-root': {
            padding: [16, 8, 0]
        }
    };
    export const component = AppStyle.decorate(style)<Props>(
        sheet =>
            class extends React.Component<Props, State> {
                constructor(props: Props) {
                    super(props);
                    this.state = {
                        value: props.value ? props.value : ''
                    };
                }
                private handleChange = (e, v) => {
                    this.setState({ value: v });
                    this.props.onChange(e, v);
                };
                render() {
                    return (
                        <AppFormControl.component
                            component="fieldset"
                            classes={{
                                root: sheet.classes['form-control-root']
                            }}
                        >
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
                                            <AppRadio.component
                                                {...item.radioProps}
                                            />
                                        }
                                    />
                                ))}
                            </AppRadioGroup.component>
                        </AppFormControl.component>
                    );
                }
            }
    );
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
                        checked: classes[item.name],
                        default: classes[item.name]
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
export namespace AppFieldSet {
    export interface Props {
        defaultExpanded?: boolean;
        title: string;
    }
    const styles = {
        'summary-root': {
            'min-height': 'inherit'
        },
        'summary-content': {
            margin: [8, 0]
        },
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
    export const component = AppStyle.decorate(styles)<Props>(
        sheet => props => {
            return (
                <ExpansionPanel defaultExpanded={props.defaultExpanded}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        className={sheet.classes.header}
                        classes={{
                            root: sheet.classes['summary-root'],
                            content: sheet.classes['summary-content']
                        }}
                    >
                        <AppTypography.component>
                            {props.title}
                        </AppTypography.component>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={sheet.classes.details}>
                        {props.children}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            );
        }
    );
    component.defaultProps = {
        defaultExpanded: true
    };
}
export namespace HomeSetting {
    const styles = {};
    export const component = AppStyle.decorate(styles)(sheet => props => {
        return (
            <AppForm.component title="設定">
                <AppFieldSet.component title="表示テーマ">
                    <AppGrid.component container>
                        <AppGrid.component item xs={12} md={6}>
                            <ColorPalette.component
                                title="メインカラー"
                                value={ThemeAction.action.model.args.primary}
                                onChange={(e, v) =>
                                    ThemeAction.action.emitter.emit(
                                        'changeTheme',
                                        {
                                            primary: v
                                        }
                                    )
                                }
                            />
                        </AppGrid.component>
                        <AppGrid.component item xs={12} md={6}>
                            <ColorPalette.component
                                title="サブカラー"
                                value={ThemeAction.action.model.args.secondary}
                                onChange={(e, v) =>
                                    ThemeAction.action.emitter.emit(
                                        'changeTheme',
                                        {
                                            secondary: v
                                        }
                                    )
                                }
                            />
                        </AppGrid.component>
                        <AppGrid.component item xs={12} md={6}>
                            <ColorPalette.component
                                title="エラーカラー"
                                value={ThemeAction.action.model.args.error}
                                onChange={(e, v) => {
                                    ThemeAction.action.emitter.emit(
                                        'changeTheme',
                                        {
                                            error: v
                                        }
                                    );
                                    MessagesAction.action.emitter.emit(
                                        'handleOpen',
                                        {
                                            errorMessage:
                                                'エラーカラーを変更しました。'
                                        }
                                    );
                                }}
                            />
                        </AppGrid.component>
                        <AppGrid.component item xs={12} md={6} />
                        <AppGrid.component item xs={4}>
                            <AppContainer.component
                                horizontal="center"
                                vertical="center"
                            >
                                <AppFormControlLabel.component
                                    control={
                                        <AppSwitch.component
                                            checked={
                                                ThemeAction.action.model.args
                                                    .type === 'dark'
                                            }
                                            onChange={(e, v) =>
                                                ThemeAction.action.emitter.emit(
                                                    'changeTheme',
                                                    {
                                                        type: v
                                                            ? 'dark'
                                                            : 'light'
                                                    }
                                                )
                                            }
                                        />
                                    }
                                    label="ダークテーマを使用する"
                                />
                            </AppContainer.component>
                        </AppGrid.component>
                        <AppGrid.component item xs={8}>
                            <AppTextField.component
                                label="Number"
                                value={ThemeAction.action.model.args.fontSize}
                                onChange={e => {
                                    ThemeAction.action.emitter.emit(
                                        'changeTheme',
                                        {
                                            fontSize: Number(e.target.value)
                                        }
                                    );
                                }}
                                type="number"
                            />
                        </AppGrid.component>
                        <AppGrid.component item xs={12}>
                            <AppContainer.component horizontal="right">
                                <AppButton.component
                                    variant="raised"
                                    color="secondary"
                                    onClick={() =>
                                        ThemeAction.action.emitter.emit(
                                            'setDefault'
                                        )
                                    }
                                >
                                    初期値に戻す
                                </AppButton.component>
                            </AppContainer.component>
                        </AppGrid.component>
                    </AppGrid.component>
                </AppFieldSet.component>
            </AppForm.component>
        );
    });
}
