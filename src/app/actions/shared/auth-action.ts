import { LocalstorageActionBase } from '../../../lib/shared/react-frxp';
import { Message } from './messages-action';

namespace InnerScope {
    export interface Store {
        authenticated: boolean;
    }
    export interface LogInEventArgs {
        id: string;
        password: string;
        callBackHasError: (message: Message) => void;
    }
    export interface Event {
        login: LogInEventArgs;
        logout: void;
    }
    export class Action extends LocalstorageActionBase<Store, Event> {
        constructor() {
            super('auth');
        }
        protected initialize() {
            this.observe('login').subscribe(args => {
                // ToDo 認証する
                if (args.id === '') {
                    args.callBackHasError({
                        text: '認証に失敗しました。',
                        level: 'error'
                    });
                } else {
                    this.store.authenticated = true;
                    this.next('render');
                }
            });
            this.observe('logout').subscribe(() => {
                this.store.authenticated = false;
                this.next('render');
            });
            if (!this.store) {
                this.setStore({ authenticated: false });
                this.next('render');
            }
        }
    }
}
export const authAction = new InnerScope.Action();
