import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

export class EventSubject<TEvent> {
  private inner: Subject<Partial<TEvent>>;
  constructor() {
    this.inner = new Subject<Partial<TEvent>>();
  }
  public next = <Key extends keyof TEvent>(key: Key, args?: TEvent[Key]) => {
    const partial: Partial<TEvent> = {};
    partial[key] = args;
    this.inner.next(partial);
  };
  public observe = <TKey extends keyof TEvent>(
    key: TKey,
  ): Observable<TEvent[TKey]> => {
    return this.inner
      .filter(x => Object.keys(x).some(y => y === key))
      .map(x => x[key]);
  };
  public unsubscribe = () => {
    this.inner.unsubscribe();
  };
}
