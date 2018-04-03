import { Component } from 'react';
import * as React from 'react';
import { Counter } from '../../components/counter';
import { Cbn } from '../../../lib/shared/cbn';
import { App } from '../../shared/app';

export namespace HomeIndex {
    export interface Model {
        count: number;
    }
    interface Event extends Cbn.Event {
        initialize: void;
        count: void;
    }
    class Action extends Cbn.PageAction<App.Store, 'homeIndex', Event> {
        protected initialize() {
            Cbn.Observable.fromEvent(this.emitter, 'initialize').subscribe(
                () => {
                    this.model = { count: 0 };
                    this.emitter.emit('reflesh');
                }
            );
            Cbn.Observable.fromEvent(this.emitter, 'count').subscribe(() => {
                this.model.count++;
                this.emitter.emit('reflesh');
            });
            this.emitter.emit('initialize');
        }
    }
    const action = new Action('homeIndex');
    const styles = {};
    const classes = Cbn.Jss.attachStyles(styles);
    export const component = App.withStore('homeIndex')(() => {
        return (
            <div>
                <h1>Home</h1>
                <Counter.component
                    name="test"
                    count={action.model.count}
                    onClick={e => action.emitter.emit('count')}
                />
            </div>
        );
    });
}
