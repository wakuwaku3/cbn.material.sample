import { Cbn } from '../../../lib/shared/cbn';
import { AppStore } from '../app-store';
import { Store } from 'undux';

export namespace BrowserAction {
    export const key = 'browser';
    export type key = 'browser';
    export interface Model {
        windowHeight: number;
    }
    export interface Event extends Cbn.Event {
        initialize: void;
        resize: void;
    }
    export class Action extends Cbn.PageAction<AppStore.Model, key, Event> {
        constructor(store: Store<AppStore.Model>) {
            super(key, store);
        }
        protected initialize() {
            Cbn.Observable.fromEvent(this.emitter, 'initialize').subscribe(
                () => {
                    if (!this.model) {
                        this.model = { windowHeight: window.innerHeight };
                        Cbn.Window.emitter.emit('resize');
                    }
                }
            );
            Cbn.Observable.fromEvent(Cbn.Window.emitter, 'resize').subscribe(
                () => {
                    this.emitter.emit('resize');
                }
            );
            Cbn.Observable.fromEvent(this.emitter, 'resize').subscribe(() => {
                this.model.windowHeight = innerHeight;
                this.emitter.emit('reflesh');
            });
            this.emitter.emit('initialize');
        }
    }
    export const action = new Action(AppStore.getStore());
}
