import { Component } from 'react';
import * as React from 'react';
import { Cbn } from '../../../lib/shared/cbn';
import { AppStyle } from '../../shared/app-style';
import { Typography, TextField } from 'material-ui';
import { HomeIndexAction } from '../../actions/home/home-index-action';
import {
    AppTextField,
    AppTypography
} from '../../components/material-ui/wrapper';
import { Counter } from './components/counter';

export namespace HomeIndex {
    const styles = {};
    export const component = AppStyle.decorateWithStore(
        styles,
        HomeIndexAction.key
    )(sheet => props => {
        return (
            <div>
                <AppTypography.component>Home</AppTypography.component>
                <Counter.component
                    name={HomeIndexAction.action.model.name}
                    count={HomeIndexAction.action.model.count}
                    onClick={e => HomeIndexAction.action.emitter.emit('count')}
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
    });
}
