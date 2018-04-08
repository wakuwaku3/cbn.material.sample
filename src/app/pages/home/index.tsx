import { Component } from 'react';
import * as React from 'react';
import { Cbn } from '../../../lib/shared/cbn';
import { Typography, TextField } from 'material-ui';
import {
    AppTextField,
    AppTypography
} from '../../components/material-ui/wrapper';
import { Counter } from './components/counter';
import { decorateWithStore } from '../../helper/app-style-helper';
import { homeIndexAction } from '../../actions/home/index-actions';

namespace InnerScope {
    const styles = {};
    export const component = decorateWithStore(styles, homeIndexAction.key)(
        sheet => props => {
            return (
                <div>
                    <AppTypography>Home</AppTypography>
                    <Counter
                        name={homeIndexAction.model.name}
                        count={homeIndexAction.model.count}
                        onClick={e => homeIndexAction.emit('count')}
                    />
                    <AppTextField
                        label="name"
                        type="name"
                        value={homeIndexAction.model.name}
                        margin="normal"
                        fullWidth
                        onChange={e =>
                            homeIndexAction.emit('setName', e.target.value)
                        }
                    />
                </div>
            );
        }
    );
}
export const HomeIndex = InnerScope.component;
