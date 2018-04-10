import * as React from 'react';
import { Observable } from 'rxjs';
import { Cbn } from '../../../lib/shared/cbn';
import { Test } from '../../services/test-service';
import { AppTypography, AppButton } from '../../components/material-ui/wrapper';
import { AddIcon, RemoveIcon } from '../../components/material-ui/icon-wrapper';
import { homeAboutAction } from '../../actions/home/about-actions';
import { decorateWithStore } from '../../helper/app-style-helper';

namespace InnerScope {
    const styles = {
        container: {
            display: 'flex',
            width: '100%',
            height: '100%'
        },
        item: {
            border: [1, 'solid', 'black'],
            overflow: 'auto',
            width: '100%',
            height: '100%'
        },
        'home-about': {
            padding: homeAboutAction.paddingObservable,
            textAlign: 'center'
        }
    };
    const item = (
        <div>
            <AppTypography variant="display3">About</AppTypography>
            <AppTypography variant="display2">
                {homeAboutAction.model.header}
            </AppTypography>
            <AppTypography variant="display1">
                現在の数値：{homeAboutAction.model.counter}
            </AppTypography>
            <AppButton
                variant="fab"
                color="primary"
                mini={true}
                onClick={e =>
                    homeAboutAction.emit('clickOperateCounterButton', true)
                }
            >
                <AddIcon />
            </AppButton>
            <AppButton
                variant="fab"
                color="secondary"
                mini={true}
                onClick={e =>
                    homeAboutAction.emit('clickOperateCounterButton', false)
                }
            >
                <RemoveIcon />
            </AppButton>
        </div>
    );
    export const component = decorateWithStore(styles, homeAboutAction.key)(
        sheet => () => (
            <div className={sheet.classes.container}>
                <div className={sheet.classes.item}>
                    <div className={sheet.classes['home-about']}>{item}</div>
                </div>
                <div className={sheet.classes['home-about']}>{item}</div>
            </div>
        )
    );
}
export const HomeAbout = InnerScope.component;
