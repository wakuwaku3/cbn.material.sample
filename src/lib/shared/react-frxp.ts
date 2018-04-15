import { observeWindow } from './window-helper';
import { Observable } from 'rxjs/Observable';
import { EventSubject } from './frxp';
import * as React from 'react';
import { Subscription } from 'rxjs/Subscription';

export interface RenderEvent {
    render: void;
}
export interface RenderObservable {
    observeRender(): Observable<RenderEvent['render']>;
}
export abstract class ActionBase<TStore extends object, TEvent = {}>
    implements RenderObservable {
    protected _store: TStore;
    private subject = new EventSubject<TEvent & RenderEvent>();
    constructor(
        store?: TStore,
        protected setStore?: (store: Partial<TStore>) => void
    ) {
        if (!this.setStore) {
            this.setStore = store => {
                if (this._store) {
                    this._store = store as TStore;
                    return;
                }
                this._store = Object.assign({}, this._store, store);
            };
        }
        if (store) {
            this.setStore(store);
        }
        this.observe('render').subscribe(() => {
            this.setStore(this._store);
        });
        this.initialize();
    }
    get store() {
        return this._store;
    }
    protected abstract initialize();
    observeRender() {
        return this.observe('render');
    }
    protected observe<TKey extends keyof (TEvent & RenderEvent)>(
        key: TKey
    ): Observable<(TEvent & RenderEvent)[TKey]> {
        return this.subject.observe(key);
    }
    next<TKey extends keyof (TEvent & RenderEvent)>(
        key: TKey,
        args?: (TEvent & RenderEvent)[TKey]
    ) {
        this.subject.next(key, args);
    }
}
export abstract class LocalstorageActionBase<
    TStore extends object,
    TEvent
> extends ActionBase<TStore, TEvent> {
    constructor(key: string) {
        super(JSON.parse(localStorage.getItem(key)));
        this.observe('render').subscribe(() => {
            this.setStore(this._store);
            localStorage.setItem(key, JSON.stringify(this._store));
        });

        observeWindow('storage')
            .filter(e => e.key === key)
            .map(e => (this._store = JSON.parse(e.newValue)));
    }
}
export const withStore = (...refleshables: RenderObservable[]) => (
    component: React.ComponentType
) =>
    class extends React.Component<{}, { renderTrigger: boolean }> {
        subscriptions: Subscription[] = [];
        constructor(props) {
            super(props);
            this.state = { renderTrigger: false };
        }
        componentWillMount() {
            this.subscriptions = refleshables.map(item => {
                return item.observeRender().subscribe(() =>
                    this.setState({
                        renderTrigger: !this.state.renderTrigger
                    })
                );
            });
        }
        componentWillUnmount() {
            if (this.subscriptions) {
                this.subscriptions.forEach(x => x.unsubscribe());
            }
        }
        render() {
            let props = Object.assign({}, this.props, this.state);
            return React.createElement(component, props, this.props.children);
        }
    };
