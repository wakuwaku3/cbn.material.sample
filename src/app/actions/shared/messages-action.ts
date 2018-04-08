import { Cbn } from '../../../lib/shared/cbn';
import { Store } from 'undux';
import { MessagesEvent } from '../../models/actions/shared/messages';
import { ActionBase } from '../bases/action-base';

namespace InnerScope {
    const key = 'messages';
    type key = 'messages';
    type event = MessagesEvent;
    export class Action extends ActionBase<key, event> {
        constructor() {
            super(key);
        }
        protected initialize() {
            this.observe('initialize').subscribe(() => {
                if (!this.model) {
                    this.model = { isShow: false, errorMessage: '' };
                }
            });
            this.observe('handleOpen').subscribe(msg => {
                this.model = Object.assign({}, this.model, msg, {
                    isShow: true
                });
            });
            this.observe('handleClose').subscribe(reason => {
                if (reason !== 'clickaway') {
                    this.model.isShow = false;
                    this.emitter.emit('reflesh');
                }
            });
            this.emitter.emit('initialize');
        }
    }
}
export const messagesAction = new InnerScope.Action();
