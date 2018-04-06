import { LogIn } from '../../components/login';
import { App } from '../../shared/app';
import { Cbn } from '../../../lib/shared/cbn';

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
    class Action extends App.PageAction<key, Event> {
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
    export const action = new Action(key);
}
