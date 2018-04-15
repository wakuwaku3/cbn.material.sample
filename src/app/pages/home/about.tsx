import * as React from 'react';
import { Observable } from 'rxjs';
import { Test } from '../../services/test-service';
import { AppTypography, AppButton } from '../../components/material-ui/wrapper';
import { AddIcon, RemoveIcon } from '../../components/material-ui/icon-wrapper';
import { homeAboutAction } from '../../actions/home/about-actions';
import { decorate } from '../../../lib/shared/style-helper';
import { withStore } from '../../../lib/shared/react-frxp';

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
        'home-about': (props: Props) => ({
            padding: props.counter,
            textAlign: 'center'
        })
    };
    interface Props {
        header: string;
        counter: number;
        onClickOperateCounterButton: (plus: boolean) => void;
    }
    const Item = (props: Props) => (
        <div>
            <AppTypography variant="display3">About</AppTypography>
            <AppTypography variant="display2">{props.header}</AppTypography>
            <AppTypography variant="display1">
                現在の数値：{props.counter}
            </AppTypography>
            <AppButton
                variant="fab"
                color="primary"
                mini={true}
                onClick={e => props.onClickOperateCounterButton(true)}
            >
                <AddIcon />
            </AppButton>
            <AppButton
                variant="fab"
                color="secondary"
                mini={true}
                onClick={e => props.onClickOperateCounterButton(false)}
            >
                <RemoveIcon />
            </AppButton>
        </div>
    );
    const Inner = decorate(styles)(props => (
        <div className={props.classes.container}>
            <div className={props.classes.item}>
                <div className={props.classes['home-about']}>
                    <Item
                        counter={homeAboutAction.store.counter}
                        header={homeAboutAction.store.header}
                        onClickOperateCounterButton={p =>
                            homeAboutAction.next('clickOperateCounterButton', p)
                        }
                    />
                </div>
            </div>
            <div className={props.classes['home-about']}>
                <Item
                    counter={homeAboutAction.store.counter}
                    header={homeAboutAction.store.header}
                    onClickOperateCounterButton={p =>
                        homeAboutAction.next('clickOperateCounterButton', p)
                    }
                />
            </div>
        </div>
    ));
    export const component = withStore(homeAboutAction)(() => <Inner />);
}
export const HomeAbout = InnerScope.component;
