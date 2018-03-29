import jss from 'jss';
import preset from 'jss-preset-default';
import * as $ from 'jquery';
import * as events from 'events';
import * as react from 'react';
import * as undux from 'undux';
import * as rxjs from 'rxjs';

export namespace Cbn {
    export interface Event {
        reflesh: void;
    }
    export interface Props<TModel, TEvent extends Event> {
        model: TModel;
        emitter: EventEmitter<TEvent>;
    }
    export abstract class ComponentAction<TModel, TEvent extends Event> {
        constructor(protected props: Props<TModel, TEvent>) {}
        get model() {
            return this.props.model;
        }
        get emitter() {
            return this.props.emitter;
        }
    }
    export class EventEmitter<T extends Event> {
        constructor(emitter?: EventEmitter<Event>) {
            if (emitter) {
                this.on('reflesh', () => {
                    emitter.emit('reflesh');
                });
            }
        }
        private _inner = new events.EventEmitter();
        get inner() {
            return this._inner;
        }
        emit<Key extends keyof T>(key: Key, args?: T[Key]) {
            this._inner.emit(key, args);
        }
        on<Key extends keyof T>(key: Key, lisner: (args?: T[Key]) => void) {
            this._inner.on(key, lisner);
        }
    }
    export abstract class PageAction<
        TStore extends object,
        Key extends keyof TStore,
        TEvent extends Event
    > {
        emitter = new EventEmitter<TEvent>();
        constructor(private key: Key) {
            Observable.fromEvent(this.emitter, 'reflesh').subscribe(() => {
                this.reflesh();
            });
        }
        get store(): undux.Store<TStore> {
            return Undux.getStore<TStore>();
        }
        get model(): TStore[Key] {
            return this.store.get(this.key);
        }
        set model(value: TStore[Key]) {
            this.store.set(this.key)(value);
        }
        private reflesh() {
            this.model = $.extend(true, {}, this.model);
        }
    }
    export namespace Observable {
        export const fromEvent = <T extends Event, Key extends keyof T>(
            emitter: EventEmitter<T>,
            key: Key
        ) => {
            return rxjs.Observable.fromEvent(emitter.inner, key).map(
                (v: any) => {
                    return v as T[Key];
                }
            );
        };
    }
    export namespace React {
        export type SFC<TModel, TEvent extends Event> = react.SFC<
            Props<TModel, TEvent>
        >;
    }
    export namespace Undux {
        export const withLocalStorage = <TStore extends object>(
            store: undux.Store<TStore>
        ): undux.Store<TStore> => {
            store
                .beforeAll()
                .subscribe(({ key, previousValue, value }) =>
                    localStorage.setItem(key, JSON.stringify(value))
                );
            return store;
        };
        export interface InitailzeStoreOption {
            withLocalStorage: boolean;
        }
        let store: undux.Store<object>;
        export const initializeStore = <TStore extends object>(
            source: TStore,
            option?: InitailzeStoreOption
        ) => {
            let s = undux.createStore<TStore>(source);
            if (option && option.withLocalStorage) {
                withLocalStorage(s);
            }
            store = s;
        };
        export const getStore = <TStore extends object>() => {
            return store as undux.Store<TStore>;
        };
        export const withStore = <TStore extends object>() => {
            let s = getStore<TStore>();
            return undux.connect(s);
        };
    }
    export namespace Jss {
        let isSetuped = false;
        export const attachStyles = <T>(styles: T) => {
            if (!isSetuped) {
                jss.setup(preset());
            }
            let styleSheets = jss
                .createStyleSheet(styles, { link: true })
                .attach();
            return styleSheets.classes;
        };
    }
    export namespace Ajax {
        export const get = async <T>(url: string) => {
            return (await $.get('/test/get')) as T;
        };
    }
}
