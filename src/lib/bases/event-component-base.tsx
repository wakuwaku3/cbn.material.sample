import * as React from 'react';
import { EventSubject } from '../shared/frxp';
import { Observable } from 'rxjs/Observable';
import { FormEvent } from '../models/form-event';
import { StyledProps } from '../models/types';

export abstract class EventComponentBase<
  Event = {},
  Props = {},
  State = {}
> extends React.Component<Props, State> {
  private subject = new EventSubject<Event & FormEvent<State>>();
  public componentWillMount() {
    this.setupObservable();
    this.next('initialize');
  }
  public componentWillUnmount() {
    this.subject.unsubscribe();
  }
  protected abstract setupObservable();
  protected observe<TKey extends keyof (Event & FormEvent<State>)>(
    key: TKey,
  ): Observable<(Event & FormEvent<State>)[TKey]> {
    return this.subject.observe(key);
  }
  public next<TKey extends keyof (Event & FormEvent<State>)>(
    key: TKey,
    args?: (Event & FormEvent<State>)[TKey],
  ) {
    this.subject.next(key, args);
  }
}
export abstract class StyledEventComponentBase<
  Event = {},
  Style = {},
  Props = {},
  State = {}
> extends EventComponentBase<Event, Props & StyledProps<Style>, State> {}
