import { Theme, createMuiTheme } from 'material-ui';
import { Color, convertToMuiColor } from '../../models/shared/color';
import { LocalstorageActionBase } from '../../../lib/bases/localstorage-action-base';

namespace InnerScope {
  export interface Store {
    args: Args;
  }
  export interface Args {
    primary: Color;
    secondary: Color;
    error: Color;
    type: 'light' | 'dark';
    fontSize: number;
  }
  export interface Event {
    initialize: void;
    reset: void;
    changeTheme: Partial<Args>;
    changedTheme: Theme;
  }
  export class Action extends LocalstorageActionBase<Store, Event> {
    constructor() {
      super('theme');
    }
    public theme: Theme;
    protected initialize() {
      this.observe('initialize').subscribe(() => {
        if (!this.store || !this.store.args) {
          this.next('reset');
          return;
        }
        this.next('changeTheme');
      });
      this.observe('reset').subscribe(() => {
        this.setStore({
          args: {
            primary: Color.indigo,
            secondary: Color.pink,
            error: Color.red,
            type: 'light',
            fontSize: 14,
          },
        });
        this.next('changeTheme');
      });
      this.observe('changeTheme').subscribe(args => {
        this.store.args = Object.assign(this.store.args, args ? args : {});
        this.theme = createMuiTheme({
          palette: {
            primary: convertToMuiColor(this.store.args.primary),
            secondary: convertToMuiColor(this.store.args.secondary),
            error: convertToMuiColor(this.store.args.error),
            type: this.store.args.type,
          },
          typography: { fontSize: this.store.args.fontSize },
        });
        this.next('changedTheme', this.theme);
      });
      this.observe('changedTheme').subscribe(() => this.next('render'));
      this.next('initialize');
    }
  }
}
export const themeAction = new InnerScope.Action();
