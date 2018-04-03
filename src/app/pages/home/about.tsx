import * as React from 'react';
import { Observable } from 'rxjs';
import { Cbn } from '../../../lib/shared/cbn';
import { App } from '../../shared/app';
import { Test } from '../../services/test-service';
import { FloatingActionButton } from 'material-ui';
import { ContentAdd, ContentRemove } from 'material-ui/svg-icons';

export namespace HomeAbout {
    export interface Model {
        counter: number;
        header: string;
    }
    export interface Event extends Cbn.Event {
        initialize: void;
        clickOperateCounterButton: boolean;
        counterChanged: number;
    }
    class Action extends Cbn.PageAction<App.Store, 'homeAbout', Event> {
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
    const action = new Action('homeAbout');
    const styles = {
        'home-about': {
            padding: action.paddingObservable,
            textAlign: 'center'
        }
    };
    const classes = Cbn.Jss.attachStyles(styles);
    export const component = App.withStore('homeAbout')(() => (
        <div className={classes['home-about']}>
            <h1>About</h1>
            <h3>{action.model.header}</h3>
            <p>現在の数値：{action.model.counter}</p>
            <FloatingActionButton
                mini={true}
                onClick={e =>
                    action.emitter.emit('clickOperateCounterButton', true)
                }
            >
                <ContentAdd />
            </FloatingActionButton>
            <FloatingActionButton
                mini={true}
                secondary={true}
                onClick={e =>
                    action.emitter.emit('clickOperateCounterButton', false)
                }
            >
                <ContentRemove />
            </FloatingActionButton>
        </div>
    ));
}
