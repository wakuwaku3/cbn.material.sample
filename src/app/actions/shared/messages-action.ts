import { Cbn } from '../../../lib/shared/cbn';
import { AppStore } from '../app-store';
import { Store } from 'undux';

export namespace MessagesAction {
    export const key = 'messages';
    export type key = 'messages';
    export interface Model {
        isShow: boolean;
        errorMessage: string;
    }
    export interface Message {
        errorMessage: string;
    }
    export interface Event extends Cbn.Event {
        initialize: void;
        handleOpen: Message;
        handleClose: string;
    }
    export class Action extends Cbn.PageAction<AppStore.Model, key, Event> {
        constructor(store: Store<AppStore.Model>) {
            super(key, store);
        }
        protected initialize() {
            Cbn.Observable.fromEvent(this.emitter, 'initialize').subscribe(
                () => {
                    if (!this.model) {
                        this.model = { isShow: false, errorMessage: '' };
                    }
                }
            );
            Cbn.Observable.fromEvent(this.emitter, 'handleOpen').subscribe(
                msg => {
                    this.model = Object.assign({}, this.model, msg, {
                        isShow: true
                    });
                }
            );
            Cbn.Observable.fromEvent(this.emitter, 'handleClose').subscribe(
                reason => {
                    if (reason !== 'clickaway') {
                        this.model.isShow = false;
                        this.emitter.emit('reflesh');
                    }
                }
            );
            this.emitter.emit('initialize');
        }
    }
    export const action = new Action(AppStore.getStore());
}
