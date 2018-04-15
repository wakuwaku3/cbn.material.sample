import { Test } from '../../services/test-service';
import { ActionBase } from '../../../lib/bases/action-base';

namespace InnerScope {
    export interface Store {
        counter: number;
        header: string;
    }
    export interface Event {
        initialize: void;
        clickOperateCounterButton: boolean;
        counterChanged: number;
    }
    export class Action extends ActionBase<Store, Event> {
        protected initialize() {
            this.observe('clickOperateCounterButton').subscribe(async p => {
                let step = await Test.service.getStepAsync();
                this.store.counter += step * (p ? 1 : -1);
                this.next('counterChanged', this.store.counter);
                this.next('render');
            });
            this.observe('initialize').subscribe(async () => {
                this.setStore({
                    counter: 0,
                    header: await Test.service.getInitializeAsync()
                });
                this.next('render');
            });
            this.setStore({
                counter: 0,
                header: ''
            });
            this.next('initialize');
        }
    }
}

export const homeAboutAction = new InnerScope.Action();
