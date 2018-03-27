import { Component } from 'react';
import * as React from 'react';
import { AppStyleHelper } from '../../shared/helpers/app-style-helper';
import { AppStoreHelper } from '../../shared/helpers/app-store-helper';
import { ActionBase } from '../../shared/bases/action-base';
import { TestComponent } from '../../components/test-component';

export namespace HomeIndex {
    export interface Model {
        name: string;
        count: number;
    }
    class Action extends ActionBase<'HomeIndex'> {
        onTestComponentClick() {
            this.model.count += 1;
            this.reloadState();
        }
        constructor() {
            super('HomeIndex');
            if (!this.model) {
                this.model = { count: 0, name: 'test' };
            }
        }
    }
    const action = new Action();
    const styles = {};
    const classes = AppStyleHelper.attachStyles(styles);
    export const Component = AppStoreHelper.WithStore('HomeIndex')(() => {
        return (
            <div>
                <h1>Home</h1>
                <TestComponent.Component
                    name={action.model.name}
                    count={action.model.count}
                    onClick={p => action.onTestComponentClick()}
                />
            </div>
        );
    });
}
