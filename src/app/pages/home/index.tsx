import * as React from 'react';
import {
    AppGrid,
    AppCard,
    AppCardHeader,
    AppCardMedia,
    AppCardContent,
    AppTypography
} from '../../components/material-ui/wrapper';
import './index';
import { decorate } from '../../../lib/shared/style-helper';
import { Link } from 'react-router-dom';
import { Url } from '../../masters/app-router';
import { Theme } from 'material-ui';
const simple = require('../../../statics/simple.jpg');
const pane = require('../../../statics/pane.jpg');
const window = require('../../../statics/window.jpg');
const settings = require('../../../statics/settings.jpg');

namespace InnerScope {
    interface Style {
        item;
        image;
    }
    const style = (theme: Theme): Style => ({
        item: {
            'padding-bottom': 8
        },
        image: {
            padding: 2,
            width: '100%',
            '&:hover': { background: theme.palette.secondary.main }
        }
    });

    export const component = decorate(style)(props => {
        const itemProps = {
            className: props.classes.item,
            item: true,
            xs: 12 as 12,
            sm: 6 as 6
        };
        return (
            <AppGrid container>
                <AppGrid {...itemProps}>
                    <AppCard>
                        <AppCardHeader
                            title="Simple CRUD"
                            subheader="シンプルな画面デモ"
                        />
                        <AppCardMedia src={simple}>
                            <Link to={Url.productsSimpleIndex}>
                                <img
                                    src={simple}
                                    className={props.classes.image}
                                />
                            </Link>
                        </AppCardMedia>
                    </AppCard>
                </AppGrid>
                <AppGrid {...itemProps}>
                    <AppCard>
                        <AppCardHeader
                            title="Pane CRUD"
                            subheader="サイズ調節可能な画面デモ"
                        />
                        <AppCardMedia src={pane}>
                            <Link to={Url.productsPaneIndex}>
                                <img
                                    src={pane}
                                    className={props.classes.image}
                                />
                            </Link>
                        </AppCardMedia>
                    </AppCard>
                </AppGrid>
                <AppGrid {...itemProps}>
                    <AppCard>
                        <AppCardHeader
                            title="Window CRUD"
                            subheader="Window風の画面のデモ"
                        />
                        <AppCardMedia src={window}>
                            <Link to={Url.productsWindowIndex}>
                                <img
                                    src={window}
                                    className={props.classes.image}
                                />
                            </Link>
                        </AppCardMedia>
                    </AppCard>
                </AppGrid>
                <AppGrid {...itemProps}>
                    <AppCard>
                        <AppCardHeader
                            title="Settings"
                            subheader="表示テーマの変更"
                        />
                        <AppCardMedia src={settings}>
                            <Link to={Url.homeSetting}>
                                <img
                                    src={settings}
                                    className={props.classes.image}
                                />
                            </Link>
                        </AppCardMedia>
                    </AppCard>
                </AppGrid>
            </AppGrid>
        );
    });
}
export const HomeIndex = InnerScope.component;
