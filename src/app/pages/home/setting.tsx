import * as React from 'react';
import { Page } from '../../components/layout/page';
import { FieldSet } from '../../components/form-control/fieldset';
import {
    AppGrid,
    AppSwitch,
    AppTextField,
    AppButton
} from '../../components/material-ui/wrapper';
import { ColorPalette } from '../../components/form-control/color-palette';
import { SelectableContainer } from '../../components/form-control/selectable-container';
import { Adjuster } from '../../components/layout/adjuster';
import { themeAction } from '../../actions/shared/theme-action';
import { messagesAction } from '../../actions/shared/messages-action';
import { withStore } from '../../../lib/shared/react-frxp';

namespace InnerScope {
    export const component = withStore(themeAction)(() => {
        return (
            <Page title="設定">
                <FieldSet title="表示テーマ">
                    <AppGrid container>
                        <AppGrid item xs={12} md={6}>
                            <ColorPalette
                                title="メインカラー"
                                value={themeAction.store.args.primary}
                                onChange={(e, v) =>
                                    themeAction.next('changeTheme', {
                                        primary: v
                                    })
                                }
                            />
                        </AppGrid>
                        <AppGrid item xs={12} md={6}>
                            <ColorPalette
                                title="サブカラー"
                                value={themeAction.store.args.secondary}
                                onChange={(e, v) =>
                                    themeAction.next('changeTheme', {
                                        secondary: v
                                    })
                                }
                            />
                        </AppGrid>
                        <AppGrid item xs={4}>
                            <SelectableContainer
                                control={
                                    <AppSwitch
                                        checked={
                                            themeAction.store.args.type ===
                                            'dark'
                                        }
                                        onChange={(e, v) =>
                                            themeAction.next('changeTheme', {
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
                                value={themeAction.store.args.fontSize}
                                onChange={e => {
                                    themeAction.next('changeTheme', {
                                        fontSize: Number(e.target.value)
                                    });
                                }}
                                type="number"
                            />
                        </AppGrid>
                        <AppGrid item xs={12}>
                            <Adjuster horizontal="right">
                                <AppButton
                                    variant="raised"
                                    color="secondary"
                                    onClick={() => themeAction.next('reset')}
                                >
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
