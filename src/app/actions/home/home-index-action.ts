import { Cbn } from '../../../lib/shared/cbn';
import { AppStore } from '../app-store';
import { Store } from 'undux';

export namespace HomeIndexAction {
    export const key = 'homeIndex';
    export type key = 'homeIndex';
    export interface Model {
        name: string;
        count: number;
    }
    export interface Event extends Cbn.Event {
        setName: string;
        initialize: void;
        count: void;
    }
    export class Action extends Cbn.PageAction<AppStore.Model, key, Event> {
        constructor(store: Store<AppStore.Model>) {
            super(key, store);
        }
        protected initialize() {
            Cbn.Observable.fromEvent(this.emitter, 'initialize').subscribe(
                () => {
                    this.model = { count: 0, name: 'test' };
                    this.emitter.emit('reflesh');
                }
            );
            Cbn.Observable.fromEvent(this.emitter, 'count').subscribe(() => {
                this.model.count++;
                this.emitter.emit('reflesh');
            });
            Cbn.Observable.fromEvent(this.emitter, 'setName').subscribe(
                name => {
                    this.model.name = name;
                    this.emitter.emit('reflesh');
                }
            );
            this.emitter.emit('initialize');
        }
    }
    export const action = new Action(AppStore.getStore());
}
