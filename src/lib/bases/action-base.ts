import { RenderObservable } from '../models/render-observable';
import { EventSubject } from '../shared/frxp';
import { RenderEvent } from '../models/render-event';
import { Observable } from 'rxjs/Observable';

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
                if (!this._store) {
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
    observe<TKey extends keyof (TEvent & RenderEvent)>(
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
