import * as React from 'react';
import * as $ from 'jquery';
import { ActionBase } from '../../shared/bases/action-base';
import { AppStyleHelper } from '../../shared/helpers/app-style-helper';
import { AppStoreHelper } from '../../shared/helpers/app-store-helper';

export namespace HomeAbout {
    export interface Model {
        state: null | 'initializing' | 'initializd';
        counter: number;
        header: string;
    }
    class Action extends ActionBase<'HomeAbout'> {
        constructor() {
            super('HomeAbout');
            this.observable
                .filter(s => s.state === 'initializing')
                .subscribe(async () => {
                    this.model.header = await this.getInitializeAsync();
                    this.model.state = 'initializd';
                    this.reloadState();
                });
            if (!this.model) {
                this.model = { counter: 0, header: '', state: 'initializing' };
            } else {
                this.model.state = 'initializing';
                this.reloadState();
            }
        }
        async getInitializeAsync(): Promise<string> {
            return await $.get('/test/get');
        }
        async getStepAsync(): Promise<number> {
            return await $.get('/test/getStep');
        }
        async addCounterAsync(num: number) {
            let step = await this.getStepAsync();
            this.model.counter += step * num;
            this.reloadState();
        }
    }
    const action = new Action();
    const styles = {
        'home-about': {
            padding: 40,
            textAlign: 'center'
        }
    };
    const classes = AppStyleHelper.attachStyles(styles);
    export const Component = AppStoreHelper.WithStore('HomeAbout')(() => {
        return (
            <div className={classes['home-about']}>
                <h1>About</h1>
                <h3>{action.model.header}</h3>
                <p>現在の数値：{action.model.counter}</p>
                <button onClick={() => action.addCounterAsync(1)}>加算</button>
            </div>
        );
    });
}
