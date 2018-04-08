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
}
export const browserAction = new InnerScope.Action();
