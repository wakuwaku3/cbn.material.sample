import { Component } from 'react';
import * as React from 'react';
import { Counter } from '../../components/counter';
import { Cbn } from '../../../lib/shared/cbn';
import { App } from '../../shared/app';
import { Typography, TextField, Theme } from 'material-ui';
import { HomeIndexAction } from '../../actions/home/home-index-action';

export namespace HomeIndex {
    const styles = (theme: Theme) => {
        return {};
    };
    export const component = App.decorateWithStore(styles, HomeIndexAction.key)(
        sheet => props => {
            return (
                <div>
                    <Typography>Home</Typography>
                    <Counter.component
                        name={HomeIndexAction.action.model.name}
                        count={HomeIndexAction.action.model.count}
                        onClick={e =>
                            HomeIndexAction.action.emitter.emit('count')
                        }
                    />
                    <TextField
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
