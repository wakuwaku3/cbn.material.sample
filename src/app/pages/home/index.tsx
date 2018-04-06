import { Component } from 'react';
import * as React from 'react';
import { Counter } from '../../components/counter';
import { Cbn } from '../../../lib/shared/cbn';
import { App } from '../../shared/app';
import { Typography, TextField, Theme } from 'material-ui';
import { HomeIndexAction } from '../../actions/home/home-index-action';
import {
    AppTextField,
    AppTypography
} from '../../components/material-ui/wrapper';

export namespace HomeIndex {
    const styles = (theme: Theme) => {
        return {};
    };
    export const component = App.decorateWithStore(styles, HomeIndexAction.key)(
        sheet => props => {
            return (
                <div>
                    <AppTypography.component>Home</AppTypography.component>
                    <Counter.component
                        name={HomeIndexAction.action.model.name}
                        count={HomeIndexAction.action.model.count}
                        onClick={e =>
                            HomeIndexAction.action.emitter.emit('count')
                        }
                    />
                    <AppTextField.component
                        label="name"
                        type="name"
                        value={HomeIndexAction.action.model.name}
                        margin="normal"
                        fullWidth
                        onChange={e =>
                            HomeIndexAction.action.emitter.emit(
                                'setName',
                                e.target.value
                            )
                        }
                    />
                </div>
            );
        }
    );
}
