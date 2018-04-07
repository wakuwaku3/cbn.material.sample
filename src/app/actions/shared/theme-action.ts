import { Observable } from 'rxjs';
import { AppStore } from '../app-store';
import { Cbn } from '../../../lib/shared/cbn';
import { Theme, createMuiTheme, Color as MuiColor } from 'material-ui';
import * as colors from 'material-ui/colors';
import { Store } from 'undux';
import { Color, convertToMuiColor } from '../../shared/models/color';

export namespace ThemeAction {
    export const key = 'theme';
    export type key = 'theme';
    export interface Event {
        initialize: void;
        changeTheme: Partial<Args>;
        changedTheme: Theme;
    }
    export interface Model {
        args: Args;
    }
    export interface Args {
        primary: Color;
        secondary: Color;
        error: Color;
        type: 'light' | 'dark';
        fontSize: number;
    }
    export class Action extends Cbn.PageAction<AppStore.Model, key, Event> {
        theme: Theme;
        getThemeObservable(): Observable<Theme> {
            return Cbn.Observable.fromEvent(
                this.emitter,
                'changedTheme'
            ).startWith(this.theme);
        }
        constructor(store: Store<AppStore.Model>) {
            super(key, store);
        }
        protected initialize() {
            Cbn.Observable.fromEvent(this.emitter, 'initialize').subscribe(
                () => {
                    if (!this.model || !this.model.args) {
                        this.model = {
                            args: {
                                primary: Color.indigo,
                                secondary: Color.pink,
                                error: Color.red,
                                type: 'light',
                                fontSize: 14
                            }
                        };
                    }
                    this.emitter.emit('changeTheme');
                }
            );
            Cbn.Observable.fromEvent(this.emitter, 'changeTheme').subscribe(
                args => {
                    this.model.args = Object.assign(
                        this.model.args,
                        args ? args : {}
                    );
                    this.theme = createMuiTheme({
                        palette: {
                            primary: convertToMuiColor(this.model.args.primary),
                            secondary: convertToMuiColor(
                                this.model.args.secondary
                            ),
                            error: convertToMuiColor(this.model.args.error),
                            type: this.model.args.type
                        },
                        typography: { fontSize: this.model.args.fontSize }
                    });
                    this.emitter.emit('changedTheme', this.theme);
                }
            );
            Cbn.Observable.fromEvent(this.emitter, 'changedTheme').subscribe(
                () => this.emitter.emit('reflesh')
            );
            this.emitter.emit('initialize');
        }
    }
    export const action = new Action(AppStore.getStore());
}
