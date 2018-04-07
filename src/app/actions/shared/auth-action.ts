import { LogIn } from '../../components/login';
import { AppStore } from '../app-store';
import { Cbn } from '../../../lib/shared/cbn';
import { Store } from 'undux';

export namespace AuthAction {
    export const key = 'auth';
    export type key = 'auth';
    export interface Event {
        login: LogIn.EventArgs;
        logout: void;
    }
    export interface Model {
        authenticated: boolean;
    }
    export class Action extends Cbn.PageAction<AppStore.Model, key, Event> {
        constructor(store: Store<AppStore.Model>) {
            super(key, store);
        }
        protected initialize() {
            Cbn.Observable.fromEvent(this.emitter, 'login').subscribe(args => {
                // ToDo 認証する
                if (args.id === '') {
                    args.callBackHasError('認証に失敗しました。');
                } else {
                    this.model.authenticated = true;
                    this.emitter.emit('reflesh');
                }
            });
            Cbn.Observable.fromEvent(this.emitter, 'logout').subscribe(() => {
                this.model.authenticated = false;
                this.emitter.emit('reflesh');
            });
            if (!this.model) {
                this.model = { authenticated: false };
            }
        }
    }
    export const action = new Action(AppStore.getStore());
}
