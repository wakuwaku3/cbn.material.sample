import { Cbn } from '../../../lib/shared/cbn';
import { Store } from 'undux';
import { BrowserEvent } from '../../models/actions/shared/browser';
import { ActionBase } from '../bases/action-base';

namespace InnerScope {
    const key = 'browser';
    type key = 'browser';
    type event = BrowserEvent;
    export class Action extends ActionBase<key, event> {
        constructor() {
            super(key);
        }
        protected initialize() {
            Cbn.Window.observe('resize').subscribe(() => {
                this.emit('resize');
            });
            this.observe('initialize').subscribe(() => {
                if (!this.model) {
                    this.model = { windowHeight: window.innerHeight };
                    this.emit('resize');
                }
            });
            this.observe('resize').subscribe(() => {
                this.model.windowHeight = innerHeight;
                this.emitter.emit('reflesh');
            });
            this.emitter.emit('initialize');
        }
    }
}
export const browserAction = new InnerScope.Action();
