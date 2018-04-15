import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

export class EventSubject<TEvent> {
    private _inner = new Subject<Partial<TEvent>>();
    next = <Key extends keyof TEvent>(key: Key, args?: TEvent[Key]) => {
        let partial: Partial<TEvent> = {};
        partial[key] = args;
        this._inner.next(partial);
    };
    observe = <TKey extends keyof TEvent>(
        key: TKey
    ): Observable<TEvent[TKey]> => {
        return this._inner
            .filter(x => Object.keys(x).some(y => y === key))
            .map(x => x[key]);
    };
}
