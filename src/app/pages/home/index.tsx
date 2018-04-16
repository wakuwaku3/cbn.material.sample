import * as React from 'react';
import {
    AppGrid,
    AppCard,
    AppCardHeader,
    AppCardMedia,
    AppCardContent,
    AppTypography
} from '../../components/material-ui/wrapper';

namespace InnerScope {
    const styles = {};

    export const component: React.SFC = props => {
        return (
            <AppGrid container>
                <AppGrid item>
                    <AppCard>
                        <AppCardHeader
                            title="Simple CRUD"
                            subheader="シンプルな画面デモ"
                        />
                        <AppCardMedia
                            //image="/static/images/cards/paella.jpg"
                            title="Simple CRUD"
                        />
                    </AppCard>
                </AppGrid>
                <AppGrid item>
                    <AppCard>
                        <AppCardHeader
                            title="Pane CRUD"
                            subheader="サイズ調節可能な画面デモ"
                        />
                        <AppCardMedia
                            //image="/static/images/cards/paella.jpg"
                            title="Pane CRUD"
                        />
                    </AppCard>
                </AppGrid>
                <AppGrid item>
                    <AppCard>
                        <AppCardHeader
                            title="Window CRUD"
                            subheader="Window風の画面のデモ"
                        />
                        <AppCardMedia
                            //image="/static/images/cards/paella.jpg"
                            title="Window CRUD"
                        />
                    </AppCard>
                </AppGrid>
                <AppGrid item>
                    <AppCard>
                        <AppCardHeader
                            title="Settings"
                            subheader="表示テーマの変更"
                        />
                        <AppCardMedia
                            //image="/static/images/cards/paella.jpg"
                            title="Settings"
                        />
                    </AppCard>
                </AppGrid>
            </AppGrid>
        );
    };
}
export const HomeIndex = InnerScope.component;
