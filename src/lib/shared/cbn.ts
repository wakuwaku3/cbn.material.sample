import jss from 'jss';
import preset from 'jss-preset-default';
import * as $ from 'jquery';
import * as events from 'events';
import * as react from 'react';
import * as undux from 'undux';
import * as rxjs from 'rxjs';

export namespace Cbn {
    let index = 0;
    export const getKey = () => index++;

    export interface Event {
        reflesh: void;
    }
    export class EventEmitter<T> {
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
        protected abstract initialize();
        emitter = new EventEmitter<TEvent>();
        constructor(private key: Key) {
            Observable.fromEvent(this.emitter, 'reflesh').subscribe(() => {
                this.reflesh();
            });
            this.initialize();
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
        export const fromEvent = <T, Key extends keyof T>(
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
            return (await $.get(url)) as T;
        };
    }
    export namespace Window {
        interface Event {
            resize: void;
        }
        export const emitter = new EventEmitter<Event>();
        window.addEventListener('resize', () => {
            emitter.emit('resize');
        });
        export function getScrollBarWidth() {
            var inner = document.createElement('p');
            inner.style.width = '100%';
            inner.style.height = '200px';

            var outer = document.createElement('div');
            outer.style.position = 'absolute';
            outer.style.top = '0px';
            outer.style.left = '0px';
            outer.style.visibility = 'hidden';
            outer.style.width = '200px';
            outer.style.height = '150px';
            outer.style.overflow = 'hidden';
            outer.appendChild(inner);

            document.body.appendChild(outer);
            var w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            var w2 = inner.offsetWidth;
            if (w1 == w2) w2 = outer.clientWidth;

            document.body.removeChild(outer);

            return w1 - w2;
        }
    }
    export interface Pager {
        display: number;
        current: number;
        total: number;
    }
    export namespace TwoWay {
        export interface EventArgs {
            object: object;
            name: string;
            value: any;
        }
        export interface Event {
            valueChange: EventArgs;
        }
        export interface Props {
            defaultValue: any;
            onChange: (e, val) => void;
        }
        export const createProps = <T extends object, TKey extends keyof T>(
            emitter: EventEmitter<Event>,
            object: T,
            name: TKey,
            marge?: object
        ) => {
            let p = {
                defaultValue: object[name],
                value: object[name],
                onChange: (e, value) => {
                    object[name] = value;
                    emitter.emit('valueChange', {
                        object,
                        name: name,
                        value
                    });
                }
            };
            if (marge) {
                return $.extend(p, marge);
            }
            return p;
        };
    }
}
