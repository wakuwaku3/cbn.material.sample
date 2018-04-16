import { ActionBase } from '../../../lib/bases/action-base';
import { WindowItemSize } from '../../models/shared/window-item-size';

namespace InnerScope {
    export interface Store {
        name: string;
        count: number;
    }
    export interface Event {
        setName: string;
        initialize: void;
        count: void;
    }
    export class Action extends ActionBase<Store, Event> {
        protected initialize() {
            this.observe('initialize').subscribe(() => {
                this.setStore({
                    count: 0,
                    name: 'test'
                });
                this.next('render');
            });
            this.observe('count').subscribe(() => {
                this.store.count++;
                this.next('render');
            });
            this.observe('setName').subscribe(name => {
                this.store.name = name;
                this.next('render');
            });
            this.next('initialize');
        }
    }
}
export const homeIndexAction = new InnerScope.Action();
