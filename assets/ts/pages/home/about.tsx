import * as React from 'react';
import * as $ from 'jquery';
import { ActionBase } from '../../shared/action-base';
import { AppStoreFactory } from '../../shared/app-store';

export namespace HomeAboutPage {
    export interface Model {
        state: null | 'initializing' | 'initializd';
        counter: number;
        header: string;
    }
    class Action extends ActionBase<'HomeAboutState'> {
        constructor() {
            super('HomeAboutState');
            this.observable
                .filter(s => s.state === 'initializing')
                .subscribe(async () => {
                    this.model.header = await this.getInitializeAsync();
                    this.model.state = 'initializd';
                    this.reloadState();
                });
            if (!this.model.state) {
                this.model = {
                    state: 'initializing',
                    counter: 0,
                    header: null
                };
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
    export const action = new Action();
    export const view = AppStoreFactory.WithStore('HomeAboutState')(() => {
        return (
            <div>
                <h1>About</h1>
                <h3>{action.model.header}</h3>
                <p>現在の数値：{action.model.counter}</p>
                <button onClick={() => action.addCounterAsync(1)}>加算</button>
            </div>
        );
    });
}
