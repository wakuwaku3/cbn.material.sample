import * as React from 'react';
import { Observable } from 'rxjs';
import { Cbn } from '../../../lib/shared/cbn';
import { Test } from '../../services/test-service';
import { HomeAboutAction } from '../../actions/home/home-about-action';
import { AppTypography, AppButton } from '../../components/material-ui/wrapper';
import { Add, Remove } from 'material-ui-icons';
import { AppStyle } from '../../shared/app-style';

export namespace HomeAbout {
    const styles = {
        'home-about': {
            padding: HomeAboutAction.action.paddingObservable,
            textAlign: 'center'
        }
    };
    export const component = AppStyle.decorateWithStore(
        styles,
        HomeAboutAction.key
    )(sheet => () => (
        <div className={sheet.classes['home-about']}>
            <AppTypography.component variant="display3">
                About
            </AppTypography.component>
            <AppTypography.component variant="display2">
                {HomeAboutAction.action.model.header}
            </AppTypography.component>
            <AppTypography.component variant="display1">
                現在の数値：{HomeAboutAction.action.model.counter}
            </AppTypography.component>
            <AppButton.component
                variant="fab"
                color="primary"
                mini={true}
                onClick={e =>
                    HomeAboutAction.action.emitter.emit(
                        'clickOperateCounterButton',
                        true
                    )
                }
            >
                <Add />
            </AppButton.component>
            <AppButton.component
                variant="fab"
                color="secondary"
                mini={true}
                onClick={e =>
                    HomeAboutAction.action.emitter.emit(
                        'clickOperateCounterButton',
                        false
                    )
                }
            >
                <Remove />
            </AppButton.component>
        </div>
    ));
}
