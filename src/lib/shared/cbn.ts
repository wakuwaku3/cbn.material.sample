import jss, { GenerateClassName } from 'jss';
import preset from 'jss-preset-default';
import * as events from 'events';
import * as rxjs from 'rxjs';
import { Store, createStore } from 'undux';
import { StyleRules } from 'material-ui/styles';
import { StyleRulesCallback, withStyles, Theme } from 'material-ui';
import { WithStylesOptions } from 'material-ui/styles/withStyles';
import * as createReactClass from 'create-react-class';

export namespace Cbn {
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
        observe<TKey extends keyof T>(key: TKey) {
            return Observable.fromEvent(this, key);
        }
    }
    export abstract class PageAction<TStore extends object, Key extends keyof TStore, TEvent> {
        protected abstract initialize();
        emitter = new EventEmitter<TEvent & Event>();
        constructor(public key: Key, protected store: Store<TStore>) {
            this.observe('reflesh').subscribe(() => {
                this.reflesh();
            });
            this.initialize();
        }
        get model(): TStore[Key] {
            return this.store.get(this.key);
        }
        set model(value: TStore[Key]) {
            this.store.set(this.key)(value);
        }
        private reflesh() {
            this.model = Object.assign({}, this.model);
        }
        observe<TKey extends keyof (TEvent & Event)>(key: TKey): rxjs.Observable<(TEvent & Event)[TKey]> {
            return this.emitter.observe(key);
        }
        emit<TKey extends keyof (TEvent & Event)>(key: TKey, args?: (TEvent & Event)[TKey]) {
            this.emitter.emit(key, args);
        }
    }
    interface StyledProps {
        className?: string;
    }
    export const mergeClassNeme = <T extends StyledProps>(props: T, ...classNames: string[]) => {
        if (props) {
            let assign: StyledProps = {
                className: [props.className, ...classNames].filter(x => x).join(' ')
            };
            return Object.assign({}, props, assign);
        }
        return {
            className: [...classNames].filter(x => x).join(' ')
        };
    };
    export const mergeClasses = <Style>(...classesList: Partial<Record<keyof Style, string>>[]) => {
        let copy = {} as Record<keyof Style, string>;
        let x = 'x';
        x += 'a';
        classesList.filter(c => c).forEach(c => {
            Object.keys(c)
                .filter(key => c[key])
                .forEach(key => {
                    if (copy[key]) {
                        copy[key] += ' ' + c[key];
                    } else {
                        copy[key] = c[key];
                    }
                });
        });
        return copy;
    };
    export const pick = <T extends object & PickType, PickType>(obj: T) => {
        let copy = {} as Pick<T, keyof PickType>;
        Object.keys(obj)
            .filter(key => key as keyof PickType)
            .forEach(key => (copy[key] = obj[key]));
        return copy;
    };

    export namespace Observable {
        export const fromEvent = <T, Key extends keyof T>(emitter: EventEmitter<T>, key: Key) => {
            return rxjs.Observable.fromEvent(emitter.inner, key).map((v: any) => {
                return v as T[Key];
            });
        };
    }
    export function createPromise<T>() {}
    export namespace Ajax {
        export const getText = async (url: string) => {
            let response = await fetch(url);
            return response.text();
        };
        export const get = async <T>(url: string) => {
            let text = await getText(url);
            return JSON.parse(text);
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
        export const observe = (key: keyof Event) => emitter.observe(key);
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
    export namespace Material {
        export const decorate = <ClassKey extends string>(
            style: StyleRules<ClassKey> | StyleRulesCallback<ClassKey>,
            options: WithStylesOptions &
                Partial<{
                    media: string;
                    meta: string;
                    link: boolean;
                    element: HTMLStyleElement;
                    index: number;
                    generateClassName: GenerateClassName<ClassKey>;
                    classNamePrefix: string;
                }>
        ) => {
            return withStyles(style, options);
        };
    }
    export namespace Undux {
        export const withLocalStorage = <TStore extends object>(
            store: Store<TStore>,
            withLocalStorage: (keyof TStore)[]
        ): Store<TStore> => {
            withLocalStorage.forEach(key => {
                store.before(key).subscribe(p => localStorage.setItem(key, JSON.stringify(p.value)));
            });
            return store;
        };
        export interface InitailzeStoreOption<TStore extends object> {
            withLocalStorage: (keyof TStore)[];
        }
        export const initializeStore = <TStore extends object>(
            source: TStore,
            option?: InitailzeStoreOption<TStore>
        ) => {
            let store = createStore<TStore>(source);
            if (option && option.withLocalStorage) {
                withLocalStorage(store, option.withLocalStorage);
            }
            return store;
        };
    }
    export namespace Jss {
        let isSetuped = false;
        export const attachStyles = <T>(styles: T) => {
            if (!isSetuped) {
                jss.setup(preset());
            }
            return jss.createStyleSheet(styles, { link: true }).attach();
        };
    }
    export namespace DateHelper {
        export const now = () => new Date(Date.now());
        export const format = (date: Date, format: string) => {
            if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
            format = format.replace(/YYYY/g, date.getFullYear().toString());
            format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
            format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
            format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
            format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
            format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
            if (format.match(/S/g)) {
                var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
                var length = format.match(/S/g).length;
                for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
            }
            return format;
        };
    }
}
