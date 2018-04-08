import * as React from 'react';
import { AppForm } from '../../components/app-form';
import { AppFieldSet } from '../../components/app-fieldset';
import {
    AppGrid,
    AppSwitch,
    AppTextField,
    AppButton
} from '../../components/material-ui/wrapper';
import { ColorPalette } from '../../components/color-palette';
import { AppSelectableContainer } from '../../components/app-selectable-container';
import { AppContainer } from '../../components/app-container';
import { decorateWithStore } from '../../helper/app-style-helper';
import { themeAction } from '../../actions/shared/theme-action';
import { messagesAction } from '../../actions/shared/messages-action';

namespace InnerScope {
    const styles = {};
    export const component = decorateWithStore(styles, themeAction.key)(
        styles => props => {
            return (
                <AppForm title="設定">
                    <AppFieldSet title="表示テーマ">
                        <AppGrid container>
                            <AppGrid item xs={12} md={6}>
                                <ColorPalette
                                    title="メインカラー"
                                    value={themeAction.model.args.primary}
                                    onChange={(e, v) =>
                                        themeAction.emit('changeTheme', {
                                            primary: v
                                        })
                                    }
                                />
                            </AppGrid>
                            <AppGrid item xs={12} md={6}>
                                <ColorPalette
                                    title="サブカラー"
                                    value={themeAction.model.args.secondary}
                                    onChange={(e, v) =>
                                        themeAction.emit('changeTheme', {
                                            secondary: v
                                        })
                                    }
                                />
                            </AppGrid>
                            <AppGrid item xs={12} md={6}>
                                <ColorPalette
                                    title="エラーカラー"
                                    value={themeAction.model.args.error}
                                    onChange={(e, v) => {
                                        themeAction.emit('changeTheme', {
                                            error: v
                                        });
                                        messagesAction.emit('handleOpen', {
                                            errorMessage:
                                                'エラーカラーを変更しました。'
                                        });
                                    }}
                                />
                            </AppGrid>
                            <AppGrid item xs={12} md={6} />
                            <AppGrid item xs={4}>
                                <AppSelectableContainer
                                    control={
                                        <AppSwitch
                                            checked={
                                                themeAction.model.args.type ===
                                                'dark'
                                            }
                                            onChange={(e, v) =>
                                                themeAction.emit(
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
                            </AppGrid>
                            <AppGrid item xs={8}>
                                <AppTextField
                                    label="フォントサイズ"
                                    value={themeAction.model.args.fontSize}
                                    onChange={e => {
                                        themeAction.emit('changeTheme', {
                                            fontSize: Number(e.target.value)
                                        });
                                    }}
                                    type="number"
                                />
                            </AppGrid>
                            <AppGrid item xs={12}>
                                <AppContainer horizontal="right">
                                    <AppButton
                                        variant="raised"
                                        color="secondary"
                                        onClick={() =>
                                            themeAction.emit('reset')
                                        }
                                    >
                                        リセット
                                    </AppButton>
                                </AppContainer>
                            </AppGrid>
                        </AppGrid>
                    </AppFieldSet>
                </AppForm>
            );
        }
    );
}
export const HomeSettings = InnerScope.component;
