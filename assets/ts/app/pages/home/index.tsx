import { Component } from 'react';
import * as React from 'react';
import { Test } from '../../components/test-component';
import { Cbn } from '../../../lib/shared/cbn';
import { App } from '../../shared/app';

export namespace HomeIndex {
    export interface Model {
        testModel: Test.Model;
    }
    interface Event extends Cbn.Event {
        onInitialize: void;
    }
    class Action extends Cbn.PageAction<App.Store, 'HomeIndex', Event> {
        testEmitter = new Cbn.EventEmitter<Test.Event>(this.emitter);
        constructor() {
            super('HomeIndex');
            Cbn.Observable.fromEvent(this.emitter, 'onInitialize').subscribe(
                () => {
                    this.model = {
                        testModel: {
                            count: 0,
                            name: 'test'
                        }
                    };
                    this.emitter.emit('reflesh');
                }
            );
            this.emitter.emit('onInitialize');
        }
    }
    const action = new Action();
    const styles = {};
    const classes = Cbn.Jss.attachStyles(styles);
    export const component = App.withStore('HomeIndex')(() => {
        return (
            <div>
                <h1>Home</h1>
                <Test.component
                    model={action.model.testModel}
                    emitter={action.testEmitter}
                />
            </div>
        );
    });
}
