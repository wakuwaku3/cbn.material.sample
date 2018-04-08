import { Color } from '../../shared/color';
import { Theme } from 'material-ui';

export interface ThemeStore {
    args: ThemeArgs;
}
export interface ThemeArgs {
    primary: Color;
    secondary: Color;
    error: Color;
    type: 'light' | 'dark';
    fontSize: number;
}
export interface ThemeEvent {
    initialize: void;
    reset: void;
    changeTheme: Partial<ThemeArgs>;
    changedTheme: Theme;
}
