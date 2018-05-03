import { RenderObservable } from '../models/render-observable';
import { EventSubject } from '../shared/frxp';
import { RenderEvent } from '../models/render-event';
import { Observable } from 'rxjs/Observable';

export abstract class ActionBase<TStore extends object, TEvent = {}>
  implements RenderObservable {
  protected innerStore: TStore;
  private subject = new EventSubject<TEvent & RenderEvent>();
  constructor(
    store?: TStore,
    protected setStore?: (store: Partial<TStore>) => void,
  ) {
    if (!this.setStore) {
      this.setStore = s => {
        if (!this.innerStore) {
          this.innerStore = s as TStore;
          return;
        }
        this.innerStore = Object.assign({}, this.innerStore, s);
      };
    }
    if (store) {
      this.setStore(store);
    }
    this.observe('render').subscribe(() => {
      this.setStore(this.innerStore);
    });
    this.initialize();
  }
  get store() {
    return this.innerStore;
  }
  set store(store: TStore) {
    this.innerStore = store;
  }
  protected abstract initialize();
  public observeRender() {
    return this.observe('render');
  }
  public observe<TKey extends keyof (TEvent & RenderEvent)>(
    key: TKey,
  ): Observable<(TEvent & RenderEvent)[TKey]> {
    return this.subject.observe(key);
  }
  public next<TKey extends keyof (TEvent & RenderEvent)>(
    key: TKey,
    args?: (TEvent & RenderEvent)[TKey],
  ) {
    this.subject.next(key, args);
  }
}
