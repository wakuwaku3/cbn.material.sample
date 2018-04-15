import * as React from 'react';
import { EventSubject } from '../shared/frxp';
import { Observable } from 'rxjs/Observable';
import { FormEvent } from '../models/form-event';

export abstract class FormComponent<Event, State> extends React.Component<
    {},
    State
> {
    private subject = new EventSubject<Event & FormEvent<State>>();
    componentWillMount() {
        this.subject = new EventSubject<Event & FormEvent<State>>();
        this.setupObservable();
        this.next('initialize');
    }
    componentWillUnmount() {
        this.subject.unsubscribe();
    }
    protected abstract setupObservable();
    protected observe<TKey extends keyof (Event & FormEvent<State>)>(
        key: TKey
    ): Observable<(Event & FormEvent<State>)[TKey]> {
        return this.subject.observe(key);
    }
    next<TKey extends keyof (Event & FormEvent<State>)>(
        key: TKey,
        args?: (Event & FormEvent<State>)[TKey]
    ) {
        this.subject.next(key, args);
    }
}
