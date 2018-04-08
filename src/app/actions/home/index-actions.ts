import { Cbn } from '../../../lib/shared/cbn';
import { Store } from 'undux';
import { ActionBase } from '../bases/action-base';
import { HomeIndexEvent } from '../../models/actions/home';

namespace InnerScope {
    const key = 'homeIndex';
    type key = 'homeIndex';
    type event = HomeIndexEvent;
    export class Action extends ActionBase<key, event> {
        constructor() {
            super(key);
        }
        protected initialize() {
            this.observe('initialize').subscribe(() => {
                this.model = { count: 0, name: 'test' };
                this.emitter.emit('reflesh');
            });
            this.observe('count').subscribe(() => {
                this.model.count++;
                this.emitter.emit('reflesh');
            });
            this.observe('setName').subscribe(name => {
                this.model.name = name;
                this.emitter.emit('reflesh');
            });
            this.emitter.emit('initialize');
        }
    }
}
export const homeIndexAction = new InnerScope.Action();
