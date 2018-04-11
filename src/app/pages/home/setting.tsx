import * as React from 'react';
import { Page } from '../../components/layout/page';
import { FieldSet } from '../../components/form-control/fieldset';
import { AppGrid, AppSwitch, AppTextField, AppButton } from '../../components/material-ui/wrapper';
import { ColorPalette } from '../../components/form-control/color-palette';
import { SelectableContainer } from '../../components/form-control/selectable-container';
import { Adjuster } from '../../components/layout/adjuster';
import { decorateWithStore } from '../../helper/app-style-helper';
import { themeAction } from '../../actions/shared/theme-action';
import { messagesAction } from '../../actions/shared/messages-action';

namespace InnerScope {
    const styles = {};
    export const component = decorateWithStore(styles, themeAction.key)(styles => props => {
        return (
            <Page title="設定">
                <FieldSet title="表示テーマ">
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
                                        errorMessage: 'エラーカラーを変更しました。'
                                    });
                                }}
                            />
                        </AppGrid>
                        <AppGrid item xs={12} md={6} />
                        <AppGrid item xs={4}>
                            <SelectableContainer
                                control={
                                    <AppSwitch
                                        checked={themeAction.model.args.type === 'dark'}
                                        onChange={(e, v) =>
                                            themeAction.emit('changeTheme', {
                                                type: v ? 'dark' : 'light'
                                            })
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
                            <Adjuster horizontal="right">
                                <AppButton variant="raised" color="secondary" onClick={() => themeAction.emit('reset')}>
                                    リセット
                                </AppButton>
                            </Adjuster>
                        </AppGrid>
                    </AppGrid>
                </FieldSet>
            </Page>
        );
    });
}
export const HomeSettings = InnerScope.component;
