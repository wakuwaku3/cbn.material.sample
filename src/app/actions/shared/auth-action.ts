import { Cbn } from '../../../lib/shared/cbn';
import { Store } from 'undux';
import { AuthEvent } from '../../models/actions/shared/auth';
import { ActionBase } from '../bases/action-base';
let i = 0;
namespace InnerScope {
    const key = 'auth';
    type key = 'auth';
    type event = AuthEvent;
    export class Action extends ActionBase<key, event> {
        constructor() {
            super(key);
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
                    this.model.authenticated = true;
                    this.emitter.emit('reflesh');
                }
            });
            this.observe('logout').subscribe(() => {
                this.model.authenticated = false;
                this.emitter.emit('reflesh');
            });
            if (!this.model) {
                this.model = { authenticated: false };
            }
        }
    }
}
export const authAction = new InnerScope.Action();
