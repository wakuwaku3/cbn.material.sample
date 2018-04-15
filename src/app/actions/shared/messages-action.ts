import { MessageLevel } from '../../../lib/models/types';
import { ActionBase } from '../../../lib/bases/action-base';

export interface Message {
    text: string;
    level: MessageLevel;
}
namespace InnerScope {
    export interface Store {
        messages: Message[];
    }
    export interface Event {
        initialize: void;
        showMessage: Message;
        removeMessage: number;
    }
    export class Action extends ActionBase<Store, Event> {
        protected initialize() {
            this.observe('initialize').subscribe(() => {
                if (!this.store) {
                    this.setStore({ messages: [] });
                    this.next('render');
                }
            });
            this.observe('showMessage').subscribe(msg => {
                this.store.messages.push(msg);
                this.next('render');
            });
            this.observe('removeMessage').subscribe(i => {
                this.store.messages.splice(i, 1);
                this.next('render');
            });
            this.next('initialize');
        }
    }
}
export const messagesAction = new InnerScope.Action();
