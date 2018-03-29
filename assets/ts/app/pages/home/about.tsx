import * as React from 'react';
import { Observable } from 'rxjs';
import { Cbn } from '../../../lib/shared/cbn';
import { App } from '../../shared/app';
import { Test } from '../../services/test-service';

export namespace HomeAbout {
    export interface Model {
        counter: number;
        header: string;
    }
    export interface Event extends Cbn.Event {
        onInitialize: void;
        onClickOperateCounterButton: boolean;
        onCounterChanged: number;
    }
    class Action extends Cbn.PageAction<App.Store, 'HomeAbout', Event> {
        paddingObservable: Observable<number>;
        constructor() {
            super('HomeAbout');
            Cbn.Observable.fromEvent(
                this.emitter,
                'onClickOperateCounterButton'
            ).subscribe(async p => {
                let step = await Test.service.getStepAsync();
                this.model.counter += step * (p ? 1 : -1);
                this.emitter.emit('onCounterChanged', this.model.counter);
                this.emitter.emit('reflesh');
            });
            Cbn.Observable.fromEvent(this.emitter, 'onInitialize').subscribe(
                async () => {
                    this.model = {
                        counter: 0,
                        header: await Test.service.getInitializeAsync()
                    };
                }
            );
            this.paddingObservable = Cbn.Observable.fromEvent(
                this.emitter,
                'onCounterChanged'
            )
                .startWith(0)
                .map(num => 40 + num / 10);
            if (!this.model) {
                this.model = { counter: 0, header: '' };
            }
            this.emitter.emit('onInitialize');
        }
    }
    const action = new Action();
    const styles = {
        'home-about': {
            padding: action.paddingObservable,
            textAlign: 'center'
        }
    };
    const classes = Cbn.Jss.attachStyles(styles);
    export const component = App.withStore('HomeAbout')(() => {
        return (
            <div className={classes['home-about']}>
                <h1>About</h1>
                <h3>{action.model.header}</h3>
                <p>現在の数値：{action.model.counter}</p>
                <button
                    onClick={() =>
                        action.emitter.emit('onClickOperateCounterButton', true)
                    }
                >
                    加算
                </button>
                <button
                    onClick={() =>
                        action.emitter.emit(
                            'onClickOperateCounterButton',
                            false
                        )
                    }
                >
                    減算
                </button>
            </div>
        );
    });
}
