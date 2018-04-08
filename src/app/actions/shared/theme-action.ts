import { Observable } from 'rxjs';
import { Cbn } from '../../../lib/shared/cbn';
import { Theme, createMuiTheme, Color as MuiColor } from 'material-ui';
import * as colors from 'material-ui/colors';
import { Store } from 'undux';
import { ThemeEvent } from '../../models/actions/shared/theme';
import { ActionBase } from '../bases/action-base';
import { Color, convertToMuiColor } from '../../models/shared/color';

namespace InnerScope {
    const key = 'theme';
    type key = 'theme';
    type event = ThemeEvent;
    export class Action extends ActionBase<key, event> {
        constructor() {
            super(key);
        }
        theme: Theme;
        getThemeObservable(): Observable<Theme> {
            return this.observe('changedTheme').startWith(this.theme);
        }
        protected initialize() {
            this.observe('initialize').subscribe(() => {
                if (!this.model || !this.model.args) {
                    this.emitter.emit('reset');
                    return;
                }
                this.emitter.emit('changeTheme');
            });
            this.observe('reset').subscribe(() => {
                this.model = {
                    args: {
                        primary: Color.indigo,
                        secondary: Color.pink,
                        error: Color.red,
                        type: 'light',
                        fontSize: 14
                    }
                };
                this.emitter.emit('changeTheme');
            });
            this.observe('changeTheme').subscribe(args => {
                this.model.args = Object.assign(
                    this.model.args,
                    args ? args : {}
                );
                this.theme = createMuiTheme({
                    palette: {
                        primary: convertToMuiColor(this.model.args.primary),
                        secondary: convertToMuiColor(this.model.args.secondary),
                        error: convertToMuiColor(this.model.args.error),
                        type: this.model.args.type
                    },
                    typography: { fontSize: this.model.args.fontSize }
                });
                this.emitter.emit('changedTheme', this.theme);
            });
            this.observe('changedTheme').subscribe(() =>
                this.emitter.emit('reflesh')
            );
            this.emitter.emit('initialize');
        }
    }
}
export const themeAction = new InnerScope.Action();
