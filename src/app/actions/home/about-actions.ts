import { Cbn } from '../../../lib/shared/cbn';
import { Test } from '../../services/test-service';
import { Observable } from 'rxjs';
import { Store } from 'undux';
import { ActionBase } from '../bases/action-base';
import { HomeAboutEvent } from '../../models/actions/home/about';

namespace InnerScope {
    const key = 'homeAbout';
    type key = 'homeAbout';
    type event = HomeAboutEvent;
    export class Action extends ActionBase<key, event> {
        constructor() {
            super(key);
        }
        paddingObservable: Observable<number>;
        protected initialize() {
            this.observe('clickOperateCounterButton').subscribe(async p => {
                let step = await Test.service.getStepAsync();
                this.model.counter += step * (p ? 1 : -1);
                this.emitter.emit('counterChanged', this.model.counter);
                this.emitter.emit('reflesh');
            });
            this.observe('initialize').subscribe(async () => {
                this.model = {
                    counter: 0,
                    header: await Test.service.getInitializeAsync()
                };
            });
            this.paddingObservable = this.observe('counterChanged')
                .startWith(0)
                .map(num => 40 + num / 10);
            if (!this.model) {
                this.model = { counter: 0, header: '' };
            }
            this.emitter.emit('initialize');
        }
    }
}
export const homeAboutAction = new InnerScope.Action();
