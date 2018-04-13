import { Cbn } from '../../../lib/shared/cbn';
import { Store } from 'undux';
import { Message } from '../../models/actions/shared/messages';
import { ActionBase } from '../bases/action-base';

namespace InnerScope {
    const key = 'messages';
    type key = 'messages';
    export interface event {
        initialize: void;
        showMessage: Message;
        removeMessage: number;
    }
    export class Action extends ActionBase<key, event> {
        constructor() {
            super(key);
        }
        protected initialize() {
            this.observe('initialize').subscribe(() => {
                if (!this.model) {
                    this.model = { messages: [] };
                }
            });
            this.observe('showMessage').subscribe(msg => {
                this.model.messages.push(msg);
                this.emitter.emit('reflesh');
            });
            this.observe('removeMessage').subscribe(i => {
                this.model.messages.splice(i, 1);
                this.emitter.emit('reflesh');
            });
            this.emitter.emit('initialize');
        }
    }
}
export const messagesAction = new InnerScope.Action();
