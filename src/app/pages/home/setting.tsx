import * as React from 'react';
import { AppStyle } from '../../shared/app-style';
import { ThemeAction } from '../../actions/shared/theme-action';
import { AppForm } from '../../components/app-form';
import { AppFieldSet } from '../../components/app-fieldset';
import { AppGrid, AppSwitch, AppTextField, AppButton } from '../../components/material-ui/wrapper';
import { ColorPalette } from '../../components/color-palette';
import { MessagesAction } from '../../actions/shared/messages-action';
import { AppSelectableContainer } from '../../components/app-selectable-container';
import { AppContainer } from '../../components/app-container';

export namespace HomeSetting {
    const styles = {};
    export const component = AppStyle.decorateWithStore(
        styles,
        ThemeAction.key
    )(styles => props => {
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
                            <AppSelectableContainer.component
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
                                                    type: v ? 'dark' : 'light'
                                                }
                                            )
                                        }
                                    />
                                }
                                label="ダークテーマを使用する"
                            />
                        </AppGrid.component>
                        <AppGrid.component item xs={8}>
                            <AppTextField.component
                                label="フォントサイズ"
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
