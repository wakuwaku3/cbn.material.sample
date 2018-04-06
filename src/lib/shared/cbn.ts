import jss, { GenerateClassName } from 'jss';
import preset from 'jss-preset-default';
import * as events from 'events';
import * as rxjs from 'rxjs';
import { Store, createStore } from 'undux';
import { StyleRules } from 'material-ui/styles';
import { StyleRulesCallback, withStyles, Theme } from 'material-ui';
import { WithStylesOptions } from 'material-ui/styles/withStyles';

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
        TEvent
    > {
        protected abstract initialize();
        emitter = new EventEmitter<TEvent & Event>();
        constructor(protected key: Key, protected store: Store<TStore>) {
            Observable.fromEvent(this.emitter, 'reflesh').subscribe(() => {
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
    }
    interface StyledProps {
        className?: string;
    }
    export const mergeClassNeme = <T extends StyledProps>(
        props: T,
        ...classNames: string[]
    ) => {
        if (props) {
            let assign: StyledProps = {
                className: [props.className, ...classNames]
                    .filter(x => x)
                    .join(' ')
            };
            return Object.assign({}, props, assign);
        }
        return {
            className: [...classNames].filter(x => x).join(' ')
        };
    };

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
                return Object.assign(p, marge);
            }
            return p;
        };
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
                store
                    .before(key)
                    .subscribe(p =>
                        localStorage.setItem(key, JSON.stringify(p.value))
                    );
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
    export type WithTheme<T> = (theme: Theme) => T;
    export type WithChildren<Props> = Props & { children?: React.ReactNode };
}
