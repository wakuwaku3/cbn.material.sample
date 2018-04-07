import { Cbn } from '../../../lib/shared/cbn';
import { Test } from '../../services/test-service';
import { Observable } from 'rxjs';
import { AppStore } from '../app-store';
import { Store } from 'undux';

export namespace HomeAboutAction {
    export const key = 'homeAbout';
    export type key = 'homeAbout';
    export interface Model {
        counter: number;
        header: string;
    }
    export interface Event extends Cbn.Event {
        initialize: void;
        clickOperateCounterButton: boolean;
        counterChanged: number;
    }
    export class Action extends Cbn.PageAction<AppStore.Model, key, Event> {
        constructor(store: Store<AppStore.Model>) {
            super(key, store);
        }
        paddingObservable: Observable<number>;
        protected initialize() {
            Cbn.Observable.fromEvent(
                this.emitter,
                'clickOperateCounterButton'
            ).subscribe(async p => {
                let step = await Test.service.getStepAsync();
                this.model.counter += step * (p ? 1 : -1);
                this.emitter.emit('counterChanged', this.model.counter);
                this.emitter.emit('reflesh');
            });
            Cbn.Observable.fromEvent(this.emitter, 'initialize').subscribe(
                async () => {
                    this.model = {
                        counter: 0,
                        header: await Test.service.getInitializeAsync()
                    };
                }
            );
            this.paddingObservable = Cbn.Observable.fromEvent(
                this.emitter,
                'counterChanged'
            )
                .startWith(0)
                .map(num => 40 + num / 10);
            if (!this.model) {
                this.model = { counter: 0, header: '' };
            }
            this.emitter.emit('initialize');
        }
    }
    export const action = new Action(AppStore.getStore());
}
